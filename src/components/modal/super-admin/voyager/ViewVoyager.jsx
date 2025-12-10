import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { reqtoSuperAdminDetailUser } from '../../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices'
import SkeletonField from '../../../skeleton/SkeletonField'

const ViewVoyager = ({ show, handleClose, id }) => {
    const dispatch = useDispatch();
    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { userDetails, userDetailsLoader } = superAdminReducer;

    useEffect(() => {
        if (id) {
            dispatch(reqtoSuperAdminDetailUser(id));
        }
    }, [id, dispatch]);

    const labels = {
        name: "Name",
        phone_number: "Phone Number",
        email: "Email Address",
        country: "Country",
        language: "Language",
        login_type: "Login Type",
    };

    const renderField = (field, label, index) => (
        <div
            className="col-6 mb-4"
            key={field}
            style={{
                paddingLeft: (index % 2 === 1) ? '0px' : '',
            }}
        >
            <label htmlFor={field} className="form-label">{label} :</label>
            <SkeletonField loading={userDetailsLoader}>
                <input
                    type="text"
                    className="form-control"
                    value={userDetails?.[field] || "-"}
                    readOnly
                />
            </SkeletonField>
        </div>
    );

    return (
        <Modal className='form' show={show} backdrop="static" centered size='lg'>
            <div className="modal-header">
                <h5 className="modal-title mb-4">View Details</h5>
                <button
                    type="button"
                    className="btn-close-icon"
                    onClick={handleClose}
                >
                    <FiX size={22} />
                </button>
            </div>
            <div className="modal-body">
                <form className='row gx-5 flex-row'>
                    <div className="col-12 mb-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <SkeletonField loading={userDetailsLoader} height={30} width={100} variant="pill">
                                <div
                                    className={`status ${userDetails?.profile_status === "active" ? "completed" : "rejected"}`}
                                >
                                    {userDetails?.profile_status === "active" ? "Active" : "Deactive"}
                                </div>
                            </SkeletonField>
                        </div>
                    </div>

                    {Object.entries(labels).map(([field, label], index) =>
                        renderField(field, label, index)
                    )}

                    <div className="col-12 mb-4">
                        <label htmlFor="login_type" className="form-label">{labels.login_type} :</label>
                        <SkeletonField loading={userDetailsLoader}>
                            <input
                                type="text"
                                className="form-control"
                                value={userDetails?.login_type || "-"}
                                readOnly
                            />
                        </SkeletonField>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ViewVoyager;
