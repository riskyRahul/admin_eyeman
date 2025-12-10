import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminAddPolicy, reqtoSuperAdminEditPolicy } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";

const AddEditPolicies = ({ handleClose, data, getPolicy }) => {
    const dispatch = useDispatch();
    const isEdit = data?.type === "editPolicy";
    const isView = data?.type === "viewPolicy";

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { addPolicyLoader, editPolicyLoader } = superAdminReducer;

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res;

        if (isEdit) {
            res = await dispatch(reqtoSuperAdminEditPolicy({
                id: data._id,
                data: formData
            }));
        } else {
            res = await dispatch(reqtoSuperAdminAddPolicy(formData));
        }

        if (res?.payload?.status || res?.payload?.success) {
            handleClose();
            getPolicy();
            setFormData({
                name: "",
                description: "",
            });
        }
    };

    useEffect(() => {
        if (data && (isEdit || isView)) {
            setFormData({
                name: data.name || "",
                description: data.description || "",
            });
        } else {
            setFormData({
                name: "",
                description: "",
            });
        }
    }, [data, isEdit, isView]);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ font: [] }],
            ["bold", "italic", "underline"],
            [{ color: [] }],
            [{ background: [] }],
            [{ list: "ordered" }],
            [{ list: "bullet" }],
            [{ align: [] }],
            ["link", "image", "code-block"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "list",
        "align",
        "link",
        "image",
        "code-block",
    ];

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
                                                    Policies
                                                </span>
                                                &gt; {isEdit ? "Edit Policy" : isView ? "View Policy" : "Add Policy"}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <form className="edit-user" onSubmit={handleSubmit}>
                                    <h2 className="title">{isEdit ? "Edit Policy" : isView ? "View Policy" : "Add Policy"}</h2>

                                    <div className="col-lg-12 mb-4">
                                        <label htmlFor="policy-name" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="policy-name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Name"
                                            required
                                            disabled={isView}
                                        />
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label">Description</label>
                                        <div style={{ height: "360px", marginBottom: "66px" }}>
                                            <ReactQuill
                                                theme="snow"
                                                value={formData.description}
                                                onChange={(value) =>
                                                    setFormData((prev) => ({ ...prev, description: value }))
                                                }
                                                placeholder="Enter Description"
                                                modules={modules}
                                                formats={formats}
                                                readOnly={isView}
                                                style={{ height: "335px" }}
                                            />
                                        </div>
                                    </div>

                                    {!isView && (
                                        <button
                                            type="submit"
                                            className="close-btn w-100 d-flex justify-content-center align-items-center"
                                            style={{ marginTop: "25px", opacity: addPolicyLoader || editPolicyLoader ? 0.7 : 1 }}
                                            disabled={addPolicyLoader || editPolicyLoader}
                                        >
                                            {(addPolicyLoader || editPolicyLoader) ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    {isEdit ? "Updating..." : "Submitting..."}
                                                </>
                                            ) : (
                                                isEdit ? "Update Policy" : "Submit"
                                            )}
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddEditPolicies;
