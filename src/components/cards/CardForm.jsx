// src/pages/CardForm.jsx
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../App";
import { useCardForm } from "./useCardForm";
import CardFormFields from "../Form/CardFormFields";

export default function CardForm() {
    const { cardId } = useParams();
    const { snackbar, setIsLoader, token } = useContext(MyContext);
    const navigate = useNavigate();

    const {
        form, setForm, handleChange, resetForm, isValid, errors
    } = useCardForm();

    const isEdit = !!cardId;

    const fetchCard = async () => {
        setIsLoader(true);
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`);
            if (!res.ok) throw new Error("כשל בטעינת כרטיס");
            const card = await res.json();
            setForm({
                title: card.title || "",
                subtitle: card.subtitle || "",
                description: card.description || "",
                phone: card.phone || "",
                email: card.email || "",
                web: card.web || "",
                imgUrl: card.image?.url || "",
                imgAlt: card.image?.alt || "",
                state: card.address?.state || "",
                country: card.address?.country || "",
                city: card.address?.city || "",
                street: card.address?.street || "",
                houseNumber: card.address?.houseNumber || 0,
                zip: card.address?.zip || 0
            });
        } catch (err) {
            snackbar("שגיאה בטעינת הכרטיס");
        } finally {
            setIsLoader(false);
        }
    };

    useEffect(() => {
        if (isEdit) fetchCard();
    }, [cardId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        const method = isEdit ? "PUT" : "POST";
        const url = isEdit
            ? `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`
            : `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`;

        const requestBody = {
            title: form.title,
            subtitle: form.subtitle,
            description: form.description,
            phone: form.phone,
            email: form.email,
            web: form.web,
            image: { url: form.imgUrl, alt: form.imgAlt },
            address: {
                state: form.state,
                country: form.country,
                city: form.city,
                street: form.street,
                houseNumber: Number(form.houseNumber),
                zip: Number(form.zip)
            }
        };

        setIsLoader(true);
        const res = await fetch(url, {
            method,
            headers: {
                "x-auth-token": token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        setIsLoader(false);
        if (res.ok) {
            snackbar(isEdit ? "הכרטיס עודכן" : "כרטיס חדש נוסף");
            resetForm();
            navigate("/myCards");
        } else {
            snackbar("שליחה נכשלה");
        }
    };

    return (
        <div className="ContainForm">
            <form onSubmit={handleSubmit} className="Form row">
                <h2 className="text-center mb-4">{isEdit ? "ערוך כרטיס" : "הוסף כרטיס"}</h2>
                <CardFormFields form={form} handleChange={handleChange} errors={errors} />
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary" disabled={!isValid}>שלח</button>
                </div>
                <div className="col-6 text-center">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/myCards")}>ביטול</button>
                </div>
                <div className="col-6 text-center">
                    <button type="button" className="btn btn-warning" onClick={resetForm}><i className="fas fa-recycle me-2"></i> איפוס</button>
                </div>
            </form>
        </div>
    );
}
