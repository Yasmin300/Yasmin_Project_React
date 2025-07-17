// src/components/CardFormFields.jsx
export default function CardFormFields({ form, handleChange, errors }) {
    return (
        <>
            <div className="col-md-6 mb-3">
                <label>כותרת:</label>
                <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} />
                {errors.title && <span>{errors.title}</span>}
            </div>

            <div className="col-md-6 mb-3">
                <label>כותרת משנה:</label>
                <input type="text" name="subtitle" className="form-control" value={form.subtitle} onChange={handleChange} />
                {errors.subtitle && <span>{errors.subtitle}</span>}
            </div>

            <div className="col-12 mb-3">
                <label>תיאור:</label>
                <textarea name="description" className="form-control" rows="3" value={form.description} onChange={handleChange}></textarea>
                {errors.description && <span>{errors.description}</span>}
            </div>

            <div className="col-md-6 mb-3">
                <label>טלפון:</label>
                <input type="text" name="phone" className="form-control" value={form.phone} onChange={handleChange} />
                {errors.phone && <span>{errors.phone}</span>}
            </div>

            <div className="col-md-6 mb-3">
                <label>אימייל:</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div className="col-12 mb-3">
                <label>אתר אינטרנט:</label>
                <input type="text" name="web" className="form-control" value={form.web} onChange={handleChange} />
                {errors.web && <span>{errors.web}</span>}
            </div>

            <div className="col-12 mb-3">
                <label>כתובת תמונה:</label>
                <input type="text" name="imgUrl" className="form-control" value={form.imgUrl} onChange={handleChange} />
                {errors.imgUrl && <span>{errors.imgUrl}</span>}
            </div>

            <div className="col-12 mb-3">
                <label>תיאור תמונה:</label>
                <input type="text" name="imgAlt" className="form-control" value={form.imgAlt} onChange={handleChange} />
            </div>

            <div className="col-md-4 mb-3">
                <label>מדינה:</label>
                <input type="text" name="country" className="form-control" value={form.country} onChange={handleChange} />
                {errors.country && <span>{errors.country}</span>}
            </div>

            <div className="col-md-4 mb-3">
                <label>עיר:</label>
                <input type="text" name="city" className="form-control" value={form.city} onChange={handleChange} />
                {errors.city && <span>{errors.city}</span>}
            </div>

            <div className="col-md-4 mb-3">
                <label>רחוב:</label>
                <input type="text" name="street" className="form-control" value={form.street} onChange={handleChange} />
                {errors.street && <span>{errors.street}</span>}
            </div>

            <div className="col-md-6 mb-3">
                <label>מספר בית:</label>
                <input type="number" name="houseNumber" className="form-control" value={form.houseNumber} onChange={handleChange} />
                {errors.houseNumber && <span>{errors.houseNumber}</span>}
            </div>

            <div className="col-md-6 mb-3">
                <label>מיקוד:</label>
                <input type="number" name="zip" className="form-control" value={form.zip} onChange={handleChange} />
                {errors.zip && <span>{errors.zip}</span>}
            </div>

            <div className="col-12 mb-3">
                <label>מחוז/מדינה:</label>
                <input type="text" name="state" className="form-control" value={form.state} onChange={handleChange} />
            </div>
        </>
    );
}
