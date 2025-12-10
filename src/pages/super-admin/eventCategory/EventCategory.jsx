import { CreatedDate } from "../../../utils/DateTimeFormate";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { useEffect, useState } from "react";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import edit from '../../../assets/images/edit.svg';
import trash from '../../../assets/images/trash.svg';
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminDeleteEventCategory, reqtoSuperAdminGeteventCategory } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import Delete from "../../../components/modal/delete/Delete";
import AddEventCategory from "../../../components/modal/super-admin/eventCategory/add/AddEventCategory";
import EditEventCategory from "../../../components/modal/super-admin/eventCategory/edit/EditEventCategory";
import { CategoryRequestIcon } from "../../../assets/IconsList";
import { useNavigate } from "react-router";
import { InputSwitch } from 'primereact/inputswitch';
import { toast } from "react-toastify";
import { authHeaders, Axios } from "../../redux-Toolkit/helper/Axios";
import { apiendpoints } from "../../../components/constants/apiendpoint";

const modal = {
    addEvenyCategory: false,
    editEventCategory: false,
    deleteEventCategory: false,
}

const initialState = {
    viewId: null,
    editEventCategory: null,
    deleteId: null,
    shareLink: null,
}

const EventCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [localList, setLocalList] = useState([]);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { eventCategoryList, loader, deleteLoader } = superAdminReducer;


    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);
    useEffect(() => {
        if (eventCategoryList) {
            setLocalList(eventCategoryList);
        }
    }, [eventCategoryList]);

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
            width: "160px",
            maxwidth: "160px",
        },
        {
            name: 'Name',
            cell: (row) => row?.title || "-",
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row.created_at),
        },
        {
            name: 'Status',
            cell: (row) => (
                <InputSwitch
                    checked={row.status === true || row.status === "Active" || row.status === 1}
                    onChange={() => handleStatusToggle(row._id, row.status)}
                />
            ),
            width: "150px",
            maxwidth: "150px",
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, editEventCategory: true });
                            setModalState({ ...modalState, editEventCategory: row });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteEventCategory: true });
                            setModalState({ ...modalState, deleteId: row._id });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>
                </div>
            ),
            width: '200px',
            maxwidth: '200px',
            center: "true"
        },

    ];

    const handleStatusToggle = async (id, currentStatus) => {
        const isActive = currentStatus === true || currentStatus === "Active" || currentStatus === 1;
        const newStatus = !isActive;

        // 🔥 1. Update UI instantly (no reload needed)
        setLocalList(prev =>
            prev.map(item =>
                item._id === id
                    ? { ...item, status: newStatus ? "Active" : "Inactive" }
                    : item
            )
        );

        try {
            // 🔥 2. Update backend
            const res = await Axios.put(
                apiendpoints.updateStatus.replace(":id", id),
                { status: newStatus ? "Active" : "Inactive" },
                authHeaders()
            );

            // 🔥 3. Show toast
            if (res.data?.success) {
                toast.success("Status updated successfully");
            } else {
                toast.error(res.data?.message || "Status update failed");
            }

        } catch (err) {
            toast.error("Status update failed");

            // ❗ Revert UI if API fails
            setLocalList(prev =>
                prev.map(item =>
                    item._id === id ? { ...item, status: !newStatus } : item
                )
            );
        }
    };

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeleteEventCategory(modalState.deleteId));
        if (res?.payload?.status?.success) {
            handleClose();
        }
    }

    const filterPlace = (localList || []).filter((i) => {
        const searchstr = `${i.title} ${i.description}`.toLowerCase();
        const matchesSearch = searchstr.includes(search.toLowerCase());

        const matchesStatus =
            select === "" ||
            (select === "Active" && (i.status === true || i.status === "Active" || i.status === 1)) ||
            (select === "Inactive" && (i.status === false || i.status === "Inactive" || i.status === 0));

        return matchesSearch && matchesStatus;
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterPlace.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const GetEventCategoryList = async () => {
        await dispatch(reqtoSuperAdminGeteventCategory());
    }

    useEffect(() => {
        GetEventCategoryList();
    }, []);
    return (
        <>
            <section className="categorylist-section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="col-lg-12 col-12 d-flex justify-content-between align-items-center flex-wrap p-0">
                                        <div className="header-title d-flex align-items-center gap-1 me-2 me-xl-4">
                                            {/* <select
                                                className="form-select form-control"
                                                id="type"
                                                name="type"
                                                value={select}
                                                onChange={(e) => setSelect(e.target.value)}
                                                required
                                            >
                                                <option value="">All</option>
                                                <option value="Basic">Basic</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Professional">Professional</option>
                                            </select> */}
                                            <h2>Campaign &gt; Event Category</h2>
                                            <button
                                                type="button"
                                                className="category-request-btn ms-3"
                                                onClick={() => navigate('/superadmin/eventCategory/categoryRequest')}
                                            >
                                                <CategoryRequestIcon size={18} className="me-2" />
                                                Category Request
                                            </button>
                                        </div>

                                        <div className="col-lg-6 col-12 d-flex justify-content-end">
                                            {/* <div className="d-flex align-items-center gap-2">
                                                <select
                                                    className="filter form-select pe-5 ps-4 me-2"
                                                    value={select}
                                                    onChange={(e) => setSelect(e.target.value)}
                                                >
                                                    <option value="">All</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div> */}

                                            <div className="search d-flex align-items-center gap-1 me-2 me-xl-4">
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

                                            <button className="add-btn boreder-0" type="button"
                                                onClick={() => setModalShow({ ...modalShow, addEvenyCategory: true })}
                                            >
                                                Add Event Category
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTableComponents
                                    columns={columns}
                                    currentPageData={currentPageData}
                                    loader={loader}
                                    filterDataLength={filterPlace?.length || 0}
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

            {/* Delete-location Modal */}
            <Delete show={modalShow.deleteEventCategory} handleClose={handleClose} isDeleteLoading={deleteLoader} handleDelete={handleDelete} role={"Event Category"} />

            {/* Add-place Modal */}
            <AddEventCategory show={modalShow.addEvenyCategory} handleClose={handleClose} eventCategoryList={eventCategoryList} />

            {/* Edit-Company Modal */}
            <EditEventCategory show={modalShow.editEventCategory} handleClose={handleClose} eventCategoryList={eventCategoryList} eventCategory={modalState.editEventCategory} />

        </>
    )
}

export default EventCategory
