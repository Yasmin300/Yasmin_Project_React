import { useState, useEffect } from "react";
import { MyContext } from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import Joi from "joi";
import './Form/form.css';
import UserFormFields from './Form/FormFieldUser';
export default function Register() {
    const [form, setForm] = useState({
        firstName: "", middleName: "", lastName: "",
        phone: "", email: "", password: "", imgUrl: "",
        imgAlt: "", state: "", country: "", city: "", street: "",
        houseNumber: 0, zip: 0, business: false
    });
    //admin@gmail.com
    // Abc!123Abc
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { snackbar, setIsLoader, setUser } = useContext(MyContext);
    const register = async ev => {
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
            email: form.email,
            password: form.password,
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
            isBusiness: form.business
        };
        const res = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (res.ok) {
            const user = await res.json();
            setIsLoader(false);
            cleanForm();
            snackbar(` נרשמת בהצלחה`);
            navigate('/login');


        } else {
            setIsLoader(false);
            const err = await res.text()
            snackbar(` הרשמה נכשלה`);
        }
    }
    function cleanForm() {
        setForm({
            firstName: "", middleName: "", lastName: "",
            phone: "", email: "", password: "", imgUrl: "",
            imgAlt: "", state: "", country: "", city: "", street: "",
            houseNumber: 0, zip: 0, business: false,
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

        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            "string.empty": "יש להזין אימייל",
            "string.email": "אימייל לא תקין",
        }),

        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-]).{9,}$/)
            .required()
            .messages({
                "string.empty": "יש להזין סיסמה",
                "string.pattern.base":
                    "הסיסמה צריכה להיות לפחות 9 תווים, עם אות גדולה, אות קטנה, מספר ותו מיוחד (!@#$%^&*-)",
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
        houseNumber: Joi.number().min(1).required().messages({
            "number.base": "מספר בית חייב להיות מספר",
            "number.min": "מספר בית חייב להיות גדול מ-0",
        }),
        zip: Joi.number().min(1).required().messages({
            "number.base": "מיקוד חייב להיות מספר",
            "number.min": "מיקוד חייב להיות גדול מ-0",
        }),

        business: Joi.boolean().required()
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
    return (
        <div className="ContainForm">
            <form className="Form" onSubmit={register}>
                <h2 className="mb-4 text-center">טופס הרשמה</h2>
                <div className="row">
                    <UserFormFields
                        form={form}
                        errors={errors}
                        handleChange={handleChange}
                        includeEmailAndPassword={true}
                        includeBusiness={true}
                    />
                    <div className="col-12 text-center">

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
