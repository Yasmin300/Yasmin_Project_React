import { useState, useEffect } from "react";
import { MyContext } from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import Joi from "joi";
import './Form/form.css';
import UserFormFields from './Form/FormFieldUser';

export default function EditProfile() {
    const [form, setForm] = useState({
        firstName: "", middleName: "", lastName: "",
        phone: "", imgUrl: "",
        imgAlt: "", state: "", country: "", city: "", street: "",
        houseNumber: 0, zip: 0,
    });
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { snackbar, setIsLoader, user, setUser, token, detoken } = useContext(MyContext);
    const edit = async ev => {
        ev.preventDefault();
        if (!isValid) return;
        setIsLoader(true);
        const requestBody = {
            name: {
                first: form.firstName,
                middle: form.middleName,
                last: form.lastName,
            },
            phone: form.phone,
            image: {
                url: form.imgUrl,
                alt: form.imgAlt,
            },
            address: {
                state: form.state,
                country: form.country,
                city: form.city,
                street: form.street,
                houseNumber: Number(form.houseNumber),
                zip: Number(form.zip),

            },
        };
        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${detoken._id}`, {
            method: 'PUT',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });

        if (res.ok) {
            setIsLoader(false);
            const user = await res.json();
            setUser(user);
            cleanForm();
            snackbar(` התקנת פרטים בהצלחה`);
            navigate('/');


        } else {
            setIsLoader(false);
            snackbar(` התקנת הפרטים נכשלה`);
        }
    }
    function cleanForm() {
        setForm({
            firstName: "", middleName: "", lastName: "",
            phone: "", imgUrl: "",
            imgAlt: "", state: "", country: "", city: "", street: "",
            houseNumber: 0, zip: 0,
        });
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const parsedValue =
            type === "checkbox" ? checked :
                name === "houseNumber" || name === "zip" ? Number(value) :
                    value;
        setForm({ ...form, [name]: parsedValue });
    };

    const schema = Joi.object({
        firstName: Joi.string().min(2).max(256).required().messages({
            "string.empty": "יש להזין שם פרטי",
            "string.min": "שם פרטי חייב להכיל לפחות 2 תווים",
        }),
        middleName: Joi.string().min(2).max(256).allow('').optional(),
        lastName: Joi.string().min(2).max(256).required().messages({
            "string.empty": "יש להזין שם משפחה",
            "string.min": "שם משפחה חייב להכיל לפחות 2 תווים",
        }),

        phone: Joi.string()
            .pattern(/^0\d{8,9}$/)
            .required()
            .messages({
                "string.empty": "יש להזין טלפון",
                "string.pattern.base": "מספר טלפון חייב להיות ישראלי תקני (למשל: 0501234567, 031234567)",
            }),

        imgUrl: Joi.string().uri().allow('').messages({
            "string.uri": "קישור לתמונה לא תקין",
        }).optional(),
        imgAlt: Joi.string().min(2).max(256).allow('').optional(),

        state: Joi.string().min(2).max(256).allow(''),
        country: Joi.string().min(2).max(256).required().messages({
            "string.empty": "יש להזין מדינה",
        }),
        city: Joi.string().min(2).max(256).required().messages({
            "string.empty": "יש להזין עיר",
        }),
        street: Joi.string().min(2).max(256).required().messages({
            "string.empty": "יש להזין רחוב",
        }),
        houseNumber: Joi.number().min(2).required().messages({
            "number.base": "מספר בית חייב להיות מספר",
            "number.min": "מספר בית חייב להיות גדול מ-0",
        }),
        zip: Joi.number().min(2).required().messages({
            "number.base": "מיקוד חייב להיות מספר",
            "number.min": "מיקוד חייב להיות גדול מ-0",
        }),

    });

    useEffect(() => {
        const { error } = schema.validate(form, { abortEarly: false });
        if (error) {
            const newErrors = {};
            error.details.forEach(err => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
            setIsValid(false);
        } else {
            setErrors({});
            setIsValid(true);
        }
    }, [form]);

    useEffect(() => {
        if (user) {
            setForm({
                firstName: user.name.first || "",
                middleName: user.name.middle || "",
                lastName: user.name.last || "",
                phone: user.phone || "",
                imgUrl: user.image.url || "",
                imgAlt: user.image.alt || "",
                state: user.address.state || "",
                country: user.address.country || "",
                city: user.address.city || "",
                street: user.address.street || "",
                houseNumber: user.address.houseNumber || 0,
                zip: user.address.zip || 0,
            });
        }
    }, [user]);
    return (
        <div className="ContainForm">
            <form className="Form" onSubmit={edit}>
                <h2 className="mb-4 text-center">טופס </h2>
                <div className="row">
                    <UserFormFields
                        form={form}
                        errors={errors}
                        handleChange={handleChange}
                    />
                    <div className="col-12 text-center">
                        {console.log(isValid)}
                        <button type="submit" className="btn btn-primary" disabled={!isValid}  >שלח</button>
                    </div>
                    <div className="col-6 text-center">
                        <button type="button" className="btn btn-primary" onClick={() => { cleanForm(); navigate('/') }}>Cancel</button>
                    </div>
                    <div className="col-6 text-center">
                        <button type="button" className="btn btn-primary" onClick={cleanForm}> <i className="fas fa-recycle me-2"></i></button>
                    </div>
                </div>
            </form>
        </div>
    )
}
