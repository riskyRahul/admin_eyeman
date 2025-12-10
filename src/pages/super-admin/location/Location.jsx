import { CreatedDate } from "../../../utils/DateTimeFormate";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { useEffect, useState } from "react";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import edit from '../../../assets/images/edit.svg';
import trash from '../../../assets/images/trash.svg';
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminDeleteLocation, reqtoSuperAdminGetLocation, reqtoSuperAdminStatusLocations } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import Delete from "../../../components/modal/delete/Delete";
import AddLocation from "../../../components/modal/super-admin/location/add/AddLocation";
import EditLocation from "../../../components/modal/super-admin/location/edit/EditLocation";
import { InputSwitch } from "primereact/inputswitch";
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

const Location = () => {
    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { locationList, loader, deleteLoader } = superAdminReducer;


    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);

    const handleStatusChange = async (Uid) => {
        await dispatch(reqtoSuperAdminStatusLocations({ id: Uid }));
    }

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
                            minWidth: "100px",
                            minHeight: "80px",
                            maxWidth: "100px",
                            maxHeight: "80px",
                            padding: '8px 0'
                        }}
                    />
                </div>
            ),
        },
        {
            name: 'Name',
            cell: (row) => row?.name || "-",
        },
        {
            name: 'Country',
            cell: (row) => row?.country || "-",
        },
        {
            name: 'Continent',
            cell: (row) => row?.continent || "-",
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row.created_at),
        },
        {
            name: 'Status',
            cell: (row) => (
                <div>
                    <InputSwitch
                        checked={row.status === "Active"}
                        onChange={() => handleStatusChange(row?._id)}
                        className="custom-switch-btn"
                    />
                </div>
            ),
            width: '150px',
            maxwidth: '150px',
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, editLocation: true });
                            setModalState({ ...modalState, editLocation: row });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteLocation: true });
                            setModalState({ ...modalState, deleteId: row._id });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>
                </div>
            ),
            width: '150px',
            maxwidth: '150px',
            center: "true"
        }
    ];

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    let filterLocation = (locationList || []).filter((i) => {
        const searchstr = `${i.name} ${i.continent} ${i.description} ${i.country}`.toLowerCase();
        return searchstr.includes(search.toLowerCase());
    });

    if (sortOption?.value === "active") {
        filterLocation = filterLocation.filter(
            (i) => i.status === "Active"
        );
    }

    if (sortOption?.value === "inactive") {
        filterLocation = filterLocation.filter(
            (i) => i.status === "Inactive"
        );
    }

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterLocation.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const GetlocationList = async () => {
        await dispatch(reqtoSuperAdminGetLocation());
    }

    useEffect(() => {
        GetlocationList();
    }, []);

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeleteLocation(modalState.deleteId));
        if (res?.payload?.status?.success) {
            handleClose();
        }
    }

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
                                            <h2>Campaign &gt; Locations</h2>
                                        </div>

                                        <div className="col-lg-6 col-12 d-flex justify-content-end gap-4">
                                            <SortDropdown
                                                options={[
                                                    { label: "Active", value: "active" },
                                                    { label: "Inactive", value: "inactive" },
                                                ]}
                                                selected={sortOption}
                                                onChange={setSortOption}
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

                                            <button className="add-btn boreder-0" type="button"
                                                onClick={() => setModalShow({ ...modalShow, addLocation: true })}
                                            >
                                                Add Location
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
                                    filterDataLength={filterLocation?.length || 0}
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
            <Delete show={modalShow.deleteLocation} handleClose={handleClose} isDeleteLoading={deleteLoader} handleDelete={handleDelete} role={"Location"} />

            {/* Edit-Company Modal */}
            <EditLocation show={modalShow.editLocation} handleClose={handleClose} GetlocationList={GetlocationList} location={modalState.editLocation} />

            {/* Add-place Modal */}
            <AddLocation show={modalShow.addLocation} handleClose={handleClose} GetlocationList={GetlocationList} />
        </>
    )
}

export default Location
