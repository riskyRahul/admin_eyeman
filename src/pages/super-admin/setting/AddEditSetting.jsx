import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminEditSettings } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";

const AddEditSetting = ({ handleClose, data, getSettings }) => {
    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { editSettingsLoader } = superAdminReducer;

    const [formData, setFormData] = useState({
        title: "",
        value: "",
        valueType: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(reqtoSuperAdminEditSettings({
            id: data._id,
            data: formData
        }));

        if (res?.payload?.status || res?.payload?.success) {
            handleClose();
            getSettings();
        }
    };

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || "",
                value: data.value || "",
                valueType: data.valueType || "",
            });
        }
    }, [data]);

    return (
        <>
            <section className="categorylist-section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="col-lg-12 col-12 d-flex justify-content-between align-items-center flex-wrap p-0">
                                        <div className="header-title d-flex align-items-center">
                                            <h2>
                                                <span
                                                    className="breadcrumb-link"
                                                    onClick={handleClose}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    Setting
                                                </span>
                                                &gt; Edit Setting
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <form className="edit-user" onSubmit={handleSubmit}>
                                    <h2 className="title">Edit Setting</h2>

                                    <div className="col-lg-12 mb-4">
                                        <label htmlFor="setting-title" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="setting-title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter Title"
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-12 mb-4">
                                        <label htmlFor="setting-value" className="form-label">
                                            Value
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="setting-value"
                                            name="value"
                                            value={formData.value}
                                            onChange={handleChange}
                                            placeholder="Enter Value"
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-12 mb-4">
                                        <label htmlFor="setting-valueType" className="form-label">
                                            Value Type
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="setting-valueType"
                                            name="valueType"
                                            value={formData.valueType}
                                            onChange={handleChange}
                                            placeholder="Enter Value Type (e.g., Coins, Minutes, USD)"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="close-btn w-100 d-flex justify-content-center align-items-center"
                                        style={{ marginTop: "25px", opacity: editSettingsLoader ? 0.7 : 1 }}
                                        disabled={editSettingsLoader}
                                    >
                                        {editSettingsLoader ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Setting"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddEditSetting;