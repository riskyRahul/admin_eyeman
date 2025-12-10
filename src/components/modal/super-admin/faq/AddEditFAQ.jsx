import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminAddFaqs, reqtoSuperAdminEditFaqs } from "../../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices";

const AddEditFAQ = ({ show, handleClose, data, getFaqs }) => {
    const dispatch = useDispatch();
    const isEdit = data?.type === "editFaqs";
    const isView = data?.type === "viewFaqs";

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { addFaqsLoader, editFaqsLoader } = superAdminReducer;

    const [faqData, setFaqData] = useState({
        question: "",
        answer: "",
        category: "",
    });

    const handleChange = (e) => {
        if (isView) return;

        const { name, value } = e.target;
        setFaqData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isView) return;

        let res;
        if (isEdit) {
            res = await dispatch(reqtoSuperAdminEditFaqs({
                id: data._id,
                data: faqData
            }));
        } else {
            res = await dispatch(reqtoSuperAdminAddFaqs(faqData));
        }

        if (res?.payload?.status || res?.payload?.success) {
            handleClose();
            getFaqs();
            setFaqData({
                question: "",
                answer: "",
                category: "",
            });
        }
    };

    useEffect(() => {
        if (show) {
            if (isEdit || isView) {
                setFaqData({
                    question: data.question || "",
                    answer: data.answer || "",
                    category: data.category || "",
                });
            } else {
                setFaqData({
                    question: "",
                    answer: "",
                    category: "",
                });
            }
        }
    }, [show, data]);

    return (
        <Modal className="form" show={show} backdrop="static" centered>
            <div className="modal-header">
                <h5 className="modal-title mb-4">
                    {isView ? "View FAQ" : isEdit ? "Edit FAQ" : "Add FAQ"}
                </h5>
                <button type="button" className="btn-close-icon" onClick={handleClose}>
                    <FiX size={22} />
                </button>
            </div>

            <div className="modal-body">
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="question" className="form-label">Question</label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            className="form-control"
                            value={faqData.question}
                            onChange={handleChange}
                            placeholder="Enter Question"
                            disabled={isView}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="answer" className="form-label">Answer</label>
                        <textarea
                            id="answer"
                            name="answer"
                            className="form-control"
                            value={faqData.answer}
                            onChange={handleChange}
                            placeholder="Enter Answer"
                            rows={5}
                            disabled={isView}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            value={faqData.category}
                            onChange={handleChange}
                            disabled={isView}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Technical">Technical</option>
                            <option value="Eyeman">Eyeman</option>
                            <option value="General">General</option>
                            <option value="Voyager">Voyager</option>
                        </select>
                    </div>

                    {!isView && (
                        <button type="submit" className="close-btn w-100" disabled={addFaqsLoader || editFaqsLoader}>
                            {(addFaqsLoader || editFaqsLoader) && (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                            )}

                            {isEdit
                                ? editFaqsLoader ? "Updating..." : "Edit FAQ"
                                : addFaqsLoader ? "Adding..." : "Add FAQ"
                            }
                        </button>
                    )}
                </form>
            </div>
        </Modal>
    );
};

export default AddEditFAQ;
