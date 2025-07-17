// src/hooks/useCardForm.js
import { useState, useEffect } from "react";
import Joi from "joi";

const defaultForm = {
    title: "", subtitle: "", description: "",
    phone: "", email: "", web: "",
    imgUrl: "", imgAlt: "", state: "",
    country: "", city: "", street: "",
    houseNumber: 0, zip: 0,
};

const schema = Joi.object({
    title: Joi.string().min(2).max(256).required().messages({
        "string.empty": "יש להזין כותרת",
        "string.min": "כותרת חייבת להכיל לפחות 2 תווים",
    }),
    subtitle: Joi.string().min(2).max(256).required().messages({
        "string.empty": "יש להזין כותרת משנית",
        "string.min": "כותרת חייבת להכיל לפחות 2 תווים",
    }),
    description: Joi.string().min(2).max(1024).required().messages({
        "string.empty": "יש להזין תיאור",
        "string.min": "תיאור חייב להכיל לפחות 2 תווים",
    }),
    phone: Joi.string().pattern(/^0\d{8,9}$/).required().messages({
        "string.empty": "יש להזין טלפון",
        "string.pattern.base": "מספר טלפון חייב להיות תקני",
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.empty": "יש להזין אימייל",
        "string.email": "אימייל לא תקין",
    }),
    web: Joi.string().uri().min(14).optional().messages({
        "string.uri": "כתובת אתר לא תקינה",
        "string.min": "כתובת האתר חייבת להכיל לפחות 14 תווים",
    }),
    imgUrl: Joi.string().uri().min(14).required().messages({
        "string.uri": "קישור לתמונה לא תקין",
    }),
    imgAlt: Joi.string().min(2).max(256).allow(''),
    state: Joi.string().min(2).max(256).allow(''),
    country: Joi.string().required().messages({ "string.empty": "יש להזין מדינה" }),
    city: Joi.string().required().messages({ "string.empty": "יש להזין עיר" }),
    street: Joi.string().required().messages({ "string.empty": "יש להזין רחוב" }),
    houseNumber: Joi.number().min(1).required().messages({
        "number.base": "מספר בית חייב להיות מספר",
        "number.min": "מספר בית חייב להיות גדול מ-0",
    }),
    zip: Joi.number().optional().messages({
        "number.base": "מיקוד חייב להיות מספר",
    }),
});

export function useCardForm(initial = defaultForm) {
    const [form, setForm] = useState(initial);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsed = ["houseNumber", "zip"].includes(name) ? Number(value) : value;
        setForm(prev => ({ ...prev, [name]: parsed }));
    };

    const resetForm = () => setForm(defaultForm);

    useEffect(() => {
        const { error } = schema.validate(form, { abortEarly: false });
        if (error) {
            const newErrors = {};
            error.details.forEach(e => {
                newErrors[e.path[0]] = e.message;
            });
            setErrors(newErrors);
            setIsValid(false);
        } else {
            setErrors({});
            setIsValid(true);
        }
    }, [form]);

    return { form, setForm, handleChange, resetForm, isValid, errors };
}
