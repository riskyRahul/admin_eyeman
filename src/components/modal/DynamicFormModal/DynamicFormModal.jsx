import React from "react";
import ImageUpload from "../imageupload/ImageUpload ";

const DynamicFormModal = ({ title, fields, formData, setFormData, onSubmit }) => {

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal-body">

            <h4 className="mb-3">{title}</h4>

            {fields.map((field, index) => {
                const { name, label, type, options, placeholder } = field;

                // TEXT INPUT
                if (type === "text") {
                    return (
                        <div className="mb-3" key={index}>
                            <label className="form-label">{label}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={placeholder}
                                value={formData[name] || ""}
                                onChange={(e) => handleChange(name, e.target.value)}
                            />
                        </div>
                    );
                }

                // SELECT DROPDOWN
                if (type === "select") {
                    return (
                        <div className="mb-3" key={index}>
                            <label className="form-label">{label}</label>
                            <select
                                className="form-select"
                                value={formData[name] || ""}
                                onChange={(e) => handleChange(name, e.target.value)}
                            >
                                <option value="">Select {label}</option>
                                {options?.map((opt, i) => (
                                    <option key={i} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    );
                }

                // TEXTAREA
                if (type === "textarea") {
                    return (
                        <div className="mb-3" key={index}>
                            <label className="form-label">{label}</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                value={formData[name] || ""}
                                onChange={(e) => handleChange(name, e.target.value)}
                            />
                        </div>
                    );
                }

                // FILE UPLOAD
                if (type === "file") {
                    return (
                        <ImageUpload
                            key={index}
                            label={label}
                            value={formData[name] ? formData[name] : null}
                            onChange={(file) => {
                                handleChange(name, file ? URL.createObjectURL(file) : null);
                            }}
                        />
                    );
                }


                return null;
            })}

            <button className="close-btn w-100 mt-4" onClick={onSubmit}>
                Submit
            </button>
        </div>
    );
};

export default DynamicFormModal;
