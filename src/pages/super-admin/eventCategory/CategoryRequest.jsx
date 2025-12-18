import { CreatedDate } from "../../../utils/DateTimeFormate";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { useEffect, useState } from "react";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminGetCategoryRequest, reqtoSuperAdminUpdateCategoryRequest } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import sort_by from '../../../assets/images/sort_by.svg';
import SortDropdown from "../../../components/common/SortDropdown";

const modal = {
    addLocation: false,
    editLocation: false,
    deleteLocation: false,
}

const initialState = {
    viewId: null,
    editLocation: null,
    deleteId: null,
    shareLink: null,
}

const CategoryRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { categoryRequestList, loader } = superAdminReducer;
    const [search, setSearch] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        setTimeout(() => {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            [...tooltipTriggerList].map((tooltipTriggerEl) => {
                return new window.bootstrap.Tooltip(tooltipTriggerEl);
            });
        }, 300);
    }, [categoryRequestList]);

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '80px',
            maxwidth: '80px',
        },
        {
            name: 'Images',
            cell: (row) => (
                <div className="">
                    <img
                        src={row.image}
                        alt="Image"
                        className={``}
                        style={{
                            minHeight: "80px",
                            minWidth: "100px",
                            maxWidth: "100px",
                            maxHeight: "80px",
                            padding: '8px 0'
                        }}
                    />
                </div>
            ),
            width: "180px",
        },
        {
            name: 'Name',
            cell: (row) => row?.title || "-",
        },
        {
            name: 'EyeMan',
            cell: (row) => row?.type || "-",
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row.created_at),
        },
        {
            name: 'Status',
            cell: (row) => {
                const status = row?.approvalStatus || "-";

                return (
                    <span
                        className="status-tooltip"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={
                            status === "Rejected" && row?.reason
                                ? `Reason: ${row.reason}`
                                : ""
                        }
                        style={{
                            cursor: status === "Rejected" && row?.reason ? "pointer" : "default",
                            color: status === "Rejected" ? "#dc3545" :
                                status === "Accepted" ? "#28a745" : "#6c757d",
                            fontWeight: "600",
                        }}
                    >
                        {status}
                    </span>
                );
            },
            width: "11%",
        },
        {
            name: "Action",
            cell: (row) => {
                if (row.approvalStatus === "Pending") {
                    return (
                        <div className="d-flex align-items-center gap-2">

                            {/* Accept Button */}
                            <button
                                className="btn btn-sm p-1"
                                style={{
                                    background: "#28a745",
                                    borderRadius: "50%",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    width: "32px",
                                    height: "32px",
                                }}
                                onClick={() => handleAccept(row._id)}
                            >
                                ✓
                            </button>

                            {/* Reject Button */}
                            <button
                                className="btn btn-sm p-1"
                                style={{
                                    background: "#dc3545",
                                    borderRadius: "50%",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    width: "32px",
                                    height: "32px",
                                }}
                                onClick={() => {
                                    setSelectedId(row._id);
                                    setShowRejectModal(true);
                                }}
                            >
                                ✕
                            </button>

                        </div>
                    );
                }

                return <span>-</span>;
            },
            width: "17%",
            center: "true",
        },
    ];

    const handleAccept = async (id) => {
        try {
            await dispatch(reqtoSuperAdminUpdateCategoryRequest({
                id: id,
                data: { approvalStatus: "Accepted" }
            })).unwrap();

            toast.success("Category Accepted");
            GetcategoryRequestList(); // reload table
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    const handleRejectSubmit = async () => {
        if (!rejectReason.trim()) {
            toast.error("Please enter reason");
            return;
        }

        try {
            await dispatch(reqtoSuperAdminUpdateCategoryRequest({
                id: selectedId,
                data: {
                    approvalStatus: "Rejected",
                    reason: rejectReason
                }
            })).unwrap();

            toast.success("Request Rejected");

            setShowRejectModal(false);
            setRejectReason("");
            setSelectedId(null);

            GetcategoryRequestList(); // refresh
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    let filterCategoryRequest = (categoryRequestList || []).filter((i) => {
        const searchstr = `${i.title} ${i.description}`.toLowerCase();
        return searchstr.includes(search.toLowerCase());
    });

    if (statusFilter?.value === "accepted") {
        filterCategoryRequest = filterCategoryRequest.filter(
            (i) => i.approvalStatus === "Accepted"
        );
    }

    if (statusFilter?.value === "rejected") {
        filterCategoryRequest = filterCategoryRequest.filter(
            (i) => i.approvalStatus === "Rejected"
        );
    }

    if (statusFilter?.value === "pending") {
        filterCategoryRequest = filterCategoryRequest.filter(
            (i) => i.approvalStatus === "Pending"
        );
    }

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterCategoryRequest.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const GetcategoryRequestList = async () => {
        await dispatch(reqtoSuperAdminGetCategoryRequest());
    }

    useEffect(() => {
        GetcategoryRequestList();
    }, []);
    return (
        <>
            <section className="categorylist-section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="d-flex flex-wrap flex-xxl-nowrap align-items-center w-100">
                                        <div className="header-title d-flex align-items-center gap-1 w-100">
                                            <h2>
                                                Campaign &gt;
                                                <span
                                                    className="breadcrumb-link"
                                                    onClick={() => navigate("/superadmin/eventCategory")}
                                                >
                                                    Event Category
                                                </span>
                                                &gt; Category Request
                                            </h2>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-xxl-end gap-3 flex-wrap w-100 mt-xxl-0 mt-3">
                                            <SortDropdown
                                                options={[
                                                    { label: "Accepted", value: "accepted" },
                                                    { label: "Rejected", value: "rejected" },
                                                    { label: "Pending", value: "pending" },
                                                ]}
                                                selected={statusFilter}
                                                onChange={setStatusFilter}
                                            />
                                            <div className="search d-flex align-items-center gap-1">
                                                <input
                                                    type="search"
                                                    className="form-control form-control-sm border-0"
                                                    placeholder='Search'
                                                    id="dt-search-0"
                                                    name='search'
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    autoComplete="off"
                                                />

                                                {
                                                    search ?
                                                        <button
                                                            className="search-cancel bg-transparent"
                                                            onClick={() => setSearch("")}
                                                        >
                                                            <img src={SearchClose} alt="Search" className="img-fluid" />
                                                        </button>
                                                        :
                                                        <img src={Search} alt="Search" className="img-fluid" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTableComponents
                                    columns={columns}
                                    currentPageData={currentPageData}
                                    loader={loader}
                                    filterDataLength={filterCategoryRequest?.length || 0}
                                    perPage={perPage}
                                    noDataTable="Data Not Found"
                                    handleRowsPerPageChange={handleRowsPerPageChange}
                                    handlePageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                show={showRejectModal}
                centered
                onHide={() => setShowRejectModal(false)}
                dialogClassName="custom-reject-modal"
            >
                <Modal.Body className="p-4">

                    {/* Title Row */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="reason">Rejected Reason</h5>
                        <button
                            className="btn-close-icon "
                            onClick={() => setShowRejectModal(false)}
                        >
                            <FiX size={22} />
                        </button>
                    </div>

                    {/* Label */}
                    <div className="title">
                        <p className="mb-2 text-start">Reason</p>
                    </div>

                    {/* Textarea */}
                    <textarea
                        className="form-control custom-textarea"
                        rows="4"
                        placeholder="Enter Reason"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />

                    {/* Submit Button */}
                    <button
                        className="close-btn mt-3 w-100"
                        onClick={handleRejectSubmit}
                    >
                        Submit
                    </button>
                </Modal.Body>
            </Modal>


        </>
    )
}

export default CategoryRequest
