import React from "react";
export default function UserFormFields({ form, errors, handleChange, includeEmailAndPassword = false, includeBusiness = false }) {
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">שם פרטי:</label>
                    <input type="text" name="firstName" className="form-control" value={form.firstName} onChange={handleChange} />
                    {errors.firstName && <span>{errors.firstName}</span>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">שם אמצעי:</label>
                    <input type="text" name="middleName" className="form-control" value={form.middleName} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">שם משפחה:</label>
                    <input type="text" name="lastName" className="form-control" value={form.lastName} onChange={handleChange} />
                    {errors.lastName && <span>{errors.lastName}</span>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">טלפון:</label>
                    <input type="text" name="phone" className="form-control" value={form.phone} onChange={handleChange} />
                    {errors.phone && <span>{errors.phone}</span>}
                </div>
                {includeEmailAndPassword && (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">דוא"ל:</label>
                            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">סיסמה:</label>
                            <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} />
                            {errors.password && <span>{errors.password}</span>}
                        </div>
                    </>
                )}
                <div className="col-12 mb-3">
                    <label className="form-label">כתובת תמונה:</label>
                    <input type="text" name="imgUrl" className="form-control" value={form.imgUrl} onChange={handleChange} />
                    {errors.imgUrl && <span>{errors.imgUrl}</span>}
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label">תיאור תמונה:</label>
                    <input type="text" name="imgAlt" className="form-control" value={form.imgAlt} onChange={handleChange} />
                    {errors.imgAlt && <span>{errors.imgAlt}</span>}
                </div>

                <div className="col-md-4 mb-3">
                    <label className="form-label">מדינה:</label>
                    <input type="text" name="country" className="form-control" value={form.country} onChange={handleChange} />
                    {errors.country && <span>{errors.country}</span>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">עיר:</label>
                    <input type="text" name="city" className="form-control" value={form.city} onChange={handleChange} />
                    {errors.city && <span>{errors.city}</span>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">רחוב:</label>
                    <input type="text" name="street" className="form-control" value={form.street} onChange={handleChange} />
                    {errors.street && <span>{errors.street}</span>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">מספר בית:</label>
                    <input type="number" name="houseNumber" className="form-control" value={form.houseNumber} onChange={handleChange} />
                    {errors.houseNumber && <span>{errors.houseNumber}</span>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">מיקוד:</label>
                    <input type="number" name="zip" className="form-control" value={form.zip} onChange={handleChange} />
                    {errors.zip && <span>{errors.zip}</span>}
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label">מחוז/מדינה:</label>
                    <input type="text" name="state" className="form-control" value={form.state} onChange={handleChange} />
                    {errors.state && <span>{errors.state}</span>}
                </div>

                {includeBusiness && (
                    <div className="col-12 form-check mb-3">
                        <div className="check">
                            <input type="checkbox" name="business" className="" checked={form.business} onChange={handleChange} />
                            <label className="">משתמש עסקי?</label>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
