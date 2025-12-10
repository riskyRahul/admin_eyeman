import React from 'react';
import { Modal } from 'react-bootstrap'
import { loaders } from '../../loader/Loader';

const Delete = ({ show, handleClose, isDeleteLoading, handleDelete, role }) => {

    return (
        <Modal className='form' show={show} backdrop="static" centered>
            <div className="modal-header">
                <h5 className="modal-title m-auto mb-3" id="deleteModalLabel">
                    {`Delete ${role}`}
                </h5>
            </div>
            <div className="modal-body">
                <p className='text-center mb-0'>
                    {`Are you sure you want to delete this ${role.toLowerCase()}?`}
                </p>

                <div className='mt-4 d-flex justify-content-end gap-2'>
                    <button
                        type="button"
                        className={`close-btn delete ${isDeleteLoading ? 'btn-loading' : ''}`}
                        disabled={isDeleteLoading}
                        onClick={handleDelete}
                    >
                        {isDeleteLoading && loaders.small}
                        {isDeleteLoading ?
                            ''
                            :
                            'Yes'
                        }
                    </button>
                    <button type="button" className="delete-btn" onClick={handleClose}>
                        No
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default Delete;