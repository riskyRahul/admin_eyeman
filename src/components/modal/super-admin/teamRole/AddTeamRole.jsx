import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiX } from "react-icons/fi";

const initialState = {
    name: "",
    email: "",
    role: "",
};

const AddTeamRole = ({ show, handleClose }) => {
    const [formData, setFormData] = useState(initialState);

    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e) => {
        setFormData((prev) => ({ ...prev, role: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        handleCloseHide();
    };

    return (
        <Modal className="form" show={show} backdrop="static" centered>
            <div className="modal-header">
                <h5 className="modal-title mb-4">Add User</h5>
                <button
                    type="button"
                    className="btn-close-icon"
                    onClick={handleCloseHide}
                >
                    <FiX size={22} />
                </button>
            </div>

            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter Name"
                            autoComplete="off"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="form-label">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="form-select"
                            value={formData.role}
                            onChange={handleRoleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div className="d-flex">
                        <button
                            type="submit"
                            className="close-btn w-100"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddTeamRole;
