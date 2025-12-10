import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loaders } from "../../../../loader/Loader";
import { reqtoSuperAdminAddEventCategory, reqtoSuperAdminGeteventCategory } from "../../../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices";
import ImageUpload from "../../../imageupload/ImageUpload ";
import { FiX } from "react-icons/fi";

const initialState = {
    title: "",
    description: "",
    eventCategoryImage: null,
    eventCategoryImagePreview: null,
};

const AddEventCategory = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { eventCategoryLoader } = superAdminReducer;

    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
    };

    const handleChange = (eOrFile) => {
        const { name, value, files } = eOrFile.target;

        if (name === "eventCategoryImage") {
            const file = files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setFormData(prev => ({
                    ...prev,
                    eventCategoryImage: file,
                    eventCategoryImagePreview: imageUrl,
                }));
            }
        } else if (name === "title") {
            setFormData(prev => ({ ...prev, title: value }));
        } else if (name === "description") {
            setFormData(prev => ({ ...prev, description: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: formData.title,
            eventCategoryImage: formData.eventCategoryImage,
            description: formData.description
        };

        try {
            const res = await dispatch(reqtoSuperAdminAddEventCategory(payload)).unwrap();

            if (res?.success === true) {
                handleCloseHide();
                dispatch(reqtoSuperAdminGeteventCategory());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <>
            <Modal className="form" show={show} backdrop="static" centered>
                <div className="modal-header">
                    <h5 className="modal-title mb-4">Add Event Category</h5>

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
                        <ImageUpload
                            label="Event Image"
                            value={formData.eventCategoryImagePreview}
                            onChange={(file) => {
                                if (file === null) {
                                    // remove image
                                    setFormData(prev => ({
                                        ...prev,
                                        eventCategoryImage: null,
                                        eventCategoryImagePreview: null,
                                    }));
                                    return;
                                }

                                // Add image
                                const imageUrl = URL.createObjectURL(file);
                                setFormData(prev => ({
                                    ...prev,
                                    eventCategoryImage: file,
                                    eventCategoryImagePreview: imageUrl,
                                }));
                            }}
                        />

                        <div className="mb-4">
                            <label htmlFor="title" className="form-label">
                                Event Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                placeholder="Enter Event Category Title"
                                autoComplete="off"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="form-label">
                                Event Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className="form-control"
                                placeholder="Enter Event Category Description"
                                autoComplete="off"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="d-flex">
                            <button
                                type="submit"
                                className="close-btn w-100"
                                disabled={eventCategoryLoader}
                            >
                                {eventCategoryLoader ? (
                                    <>
                                        {loaders.small}
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default AddEventCategory
