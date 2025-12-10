import React from "react";
import { FiImage, FiX } from "react-icons/fi";
import img_upload from "../../../assets/images/img_upload.svg";

const ImageUpload = ({ label, value, onChange }) => {
    const inputId = label + "_upload";

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        onChange(file);
    };

    return (
        <div className="mb-4">
            {label && <label className="form-label">{label}</label>}

            {/* Show Upload Box ONLY when no preview image */}
            {!value && (
                <div
                    className="upload-box text-center"
                    onClick={() => document.getElementById(inputId).click()}
                >
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <div className="upload-icon">
                            <img src={img_upload} alt="" />
                        </div>

                        <div>
                            <p className="upload-text mb-0">Click to upload image</p>
                            <p className="upload-subtext">JPG, JPEG, PNG</p>
                        </div>
                    </div>

                    <input
                        type="file"
                        id={inputId}
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                    />
                </div>
            )}

            {value && (
                <div className="preview-wrapper text-center position-relative" >
                    <img src={value} alt="Preview" className="preview-image" />

                    {/* Close Icon */}
                    <button
                        type="button"
                        className="close-btn-modal"
                        onClick={() => onChange(null)}
                    >
                        <FiX size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
