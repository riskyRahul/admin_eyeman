import { useState, useEffect } from "react";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import trash from '../../../assets/images/trash.svg';
import edit from '../../../assets/images/edit.svg';
import { RiShareBoxLine } from "react-icons/ri";
import AddEditNotification from "./AddEditNotification";
import Delete from "../../../components/modal/delete/Delete";
import { reqtoSuperAdminDeleteNotification, reqtoSuperAdminGetNotifications } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { useDispatch, useSelector } from "react-redux";
import { CreatedDate } from "../../../utils/DateTimeFormate";

const modal = {
    addEditNotification: false,
    deleteNotification: false,
};

const initialState = {
    editNotification: null,
    deleteId: null,
}

const Notification = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { notificationList, notificationLoader, deleteNotificationLoader } = superAdminReducer;

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * itemsPerPage + (index + 1),
            width: '80px',
            maxwidth: '80px',
        },
        {
            name: 'Title',
            cell: (row) => row?.title || "-",
            minwidth: "180px",
        },
        {
            name: 'Description',
            cell: (row) => {
                const desc = row?.message || "-";
                return desc.length > 50 ? `${desc.substring(0, 50)}...` : desc;
            },
            minwidth: "250px",
        },
        {
            name: 'Type',
            cell: (row) => (
                <span className={`badge ${row?.type === 'Instant' ? 'bg-success' : 'bg-primary'}`}>
                    {row?.type || "-"}
                </span>
            ),
            width: '120px',
        },
        {
            name: 'Date',
            cell: (row) => row?.type === 'Schedule' ? (row?.date || "-") : "-",
            width: '120px',
        },
        {
            name: 'Time',
            cell: (row) => row?.type === 'Schedule' ? (row?.time || "-") : "-",
            width: '100px',
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row.created_at),
            width: '150px',
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        onClick={() => {
                            setModalShow({ ...modalShow, addEditNotification: true });
                            setModalState({ ...modalState, editNotification: { ...row, notificationType: 'viewNotification' } });
                        }}
                    >
                        <RiShareBoxLine />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, addEditNotification: true });
                            setModalState({ ...modalState, editNotification: { ...row, notificationType: 'editNotification' } });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteNotification: true });
                            setModalState({ ...modalState, deleteId: row._id });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>
                </div>
            ),
            center: "true"
        },
    ];

    const filteredNotificationList = (notificationList || []).filter((notification) => {
        const searchString = `${notification.title} ${notification.message || ''}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredNotificationList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const GetNotificationList = async () => {
        await dispatch(reqtoSuperAdminGetNotifications());
    }

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeleteNotification(modalState.deleteId));
        if (res?.payload?.status?.success) {
            handleClose();
        }
    }

    useEffect(() => {
        GetNotificationList();
    }, [])

    return (
        <>
            {modalShow.addEditNotification ? (
                <AddEditNotification 
                    handleClose={handleClose} 
                    data={modalState.editNotification} 
                    getNotification={GetNotificationList} 
                />
            ) : (
                <section className="categorylist-section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div className="col-lg-12 col-12 d-flex justify-content-between align-items-center flex-wrap p-0">
                                            <div className="header-title d-flex align-items-center">
                                                <h2>Notification</h2>
                                            </div>
                                            <div className="col-12 col-xxl-8 d-flex align-items-center justify-content-xxl-end gap-3 flex-wrap">
                                                <div className="search d-flex align-items-center gap-1">
                                                    <input
                                                        type="search"
                                                        className="form-control form-control-sm border-0"
                                                        placeholder='Search'
                                                        id="dt-search-0"
                                                        name='search'
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                    {
                                                        searchTerm ? (
                                                            <button
                                                                className="search-cancel bg-transparent"
                                                                onClick={() => setSearchTerm("")}
                                                            >
                                                                <img src={SearchClose} alt="Search" className="img-fluid" />
                                                            </button>
                                                        ) : (
                                                            <img src={Search} alt="Search" className="img-fluid" />
                                                        )
                                                    }
                                                </div>
                                                <button className="add-btn boreder-0" type="button"
                                                    onClick={() => setModalShow({ ...modalShow, addEditNotification: true })}
                                                >
                                                    Add Notification
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <DataTableComponents
                                        columns={columns}
                                        currentPageData={currentPageData}
                                        loader={notificationLoader}
                                        filterDataLength={filteredNotificationList.length}
                                        perPage={itemsPerPage}
                                        noDataTable="Data Not Found"
                                        handleRowsPerPageChange={handleRowsPerPageChange}
                                        handlePageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <Delete
                show={modalShow.deleteNotification}
                handleClose={handleClose}
                isDeleteLoading={deleteNotificationLoader}
                handleDelete={handleDelete}
                role={"Notification"} />
        </>
    );
};

export default Notification;