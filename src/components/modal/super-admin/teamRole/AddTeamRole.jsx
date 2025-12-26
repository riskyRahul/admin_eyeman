import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminAddTeam, reqtoSuperAdminEditTeam } from "../../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices";

const AddTeamRole = ({ show, handleClose, data, getTeam }) => {
    const dispatch = useDispatch();
    const isEdit = data?.type === "editTeam";
    const isView = data?.type === "viewTeam";

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { addTeamLoader, editTeamLoader } = superAdminReducer;

    const [teamData, setTeamData] = useState({
        name: "",
        email: "",
        role: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        if (isView) return;

        const { name, value } = e.target;
        setTeamData((prev) => ({ ...prev, [name]: value }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!teamData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!teamData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(teamData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!teamData.role) {
            newErrors.role = "Role is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isView) return;

        if (!validateForm()) {
            return;
        }

        // Create FormData for multipart/form-data
        const formDataToSend = new FormData();
        formDataToSend.append('name', teamData.name);
        formDataToSend.append('email', teamData.email);
        formDataToSend.append('role', teamData.role);

        let res;
        if (isEdit) {
            res = await dispatch(reqtoSuperAdminEditTeam({
                id: data._id,
                data: formDataToSend
            }));
        } else {
            res = await dispatch(reqtoSuperAdminAddTeam(formDataToSend));
        }

        if (res?.payload?.status || res?.payload?.success) {
            handleClose();
            getTeam();
            setTeamData({
                name: "",
                email: "",
                role: "",
            });
            setErrors({});
        }
    };

    useEffect(() => {
        if (show) {
            if (isEdit || isView) {
                setTeamData({
                    name: data.name || "",
                    email: data.email || "",
                    role: data.role || "",
                });
            } else {
                setTeamData({
                    name: "",
                    email: "",
                    role: "",
                });
            }
            setErrors({});
        }
    }, [show, data]);

    return (
        <Modal className="form" show={show} backdrop="static" centered>
            <div className="modal-header">
                <h5 className="modal-title mb-4">
                    {isView ? "View Team Member" : isEdit ? "Edit Team Member" : "Add Team Member"}
                </h5>
                <button type="button" className="btn-close-icon" onClick={handleClose}>
                    <FiX size={22} />
                </button>
            </div>

            <div className="modal-body">
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                            Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={teamData.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            disabled={isView}
                        />
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                            Email <span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={teamData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            disabled={isView || isEdit} // Disable email in edit mode
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="form-label">
                            Role <span className="text-danger">*</span>
                        </label>
                        <select
                            id="role"
                            name="role"
                            className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                            value={teamData.role}
                            onChange={handleChange}
                            disabled={isView}
                        >
                            <option value="">Select Role</option>
                            <option value="SubAdmin">Sub Admin</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Financial">Financial</option>
                            <option value="Support">Support</option>
                            <option value="Developer">Developer</option>
                        </select>
                        {errors.role && (
                            <div className="invalid-feedback">{errors.role}</div>
                        )}
                    </div>

                    {!isView && (
                        <button 
                            type="submit" 
                            className="close-btn w-100" 
                            disabled={addTeamLoader || editTeamLoader}
                        >
                            {(addTeamLoader || editTeamLoader) && (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                            )}

                            {isEdit
                                ? editTeamLoader ? "Updating..." : "Edit Team Member"
                                : addTeamLoader ? "Adding..." : "Add Team Member"
                            }
                        </button>
                    )}
                </form>
            </div>
        </Modal>
    );
};

export default AddTeamRole;