import { CreatedDate } from "../../../utils/DateTimeFormate";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { useEffect, useState } from "react";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import edit from '../../../assets/images/edit.svg';
import trash from '../../../assets/images/trash.svg';
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminDeletePalce, reqtoSuperAdminGetPlace, reqtoSuperAdminStatusPlaces } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import Delete from "../../../components/modal/delete/Delete";
import AddPlace from "../../../components/modal/super-admin/place/add/AddPlace";
import EditPlace from "../../../components/modal/super-admin/place/edit/EditPlace";
import sort_by from '../../../assets/images/sort_by.svg';
import { InputSwitch } from "primereact/inputswitch";
import SortDropdown from "../../../components/common/SortDropdown";

const modal = {
    addPlace: false,
    editPlace: false,
    deletePlace: false,
}

const initialState = {
    viewId: null,
    editPlace: null,
    deleteId: null,
    shareLink: null,
}

const Place = () => {
    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { placeList, loader, deleteLoader } = superAdminReducer;

    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);

    const handleStatusChange = async (Uid) => {
        const res = await dispatch(reqtoSuperAdminStatusPlaces({ id: Uid }));
        if (res.payload?.status) {
        }
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
            maxwidth: "200px",
        },
        {
            name: 'Name',
            cell: (row) => row?.name || "-",
            minwidth: "180px !important",
        },
        {
            name: 'Continent',
            cell: (row) => row?.continent || "-",
            minwidth: "180px !important",
        },
        {
            name: 'Country',
            cell: (row) => row?.country || "-",
            minwidth: "180px !important",
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
                            setModalShow({ ...modalShow, editPlace: true });
                            setModalState({ ...modalState, editPlace: row });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deletePlace: true });
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

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeletePalce(modalState.deleteId));
        if (res?.payload?.status?.success) {
            handleClose();
        }
    }

    let filterPlace = (placeList || []).filter((i) => {
        const searchstr = `${i.name} ${i.continent} ${i.country}`.toLowerCase();
        return searchstr.includes(search.toLowerCase());
    });

    if (sortOption?.value === "active") {
        filterPlace = filterPlace.filter(
            (i) => i.status === "Active"
        );
    }

    if (sortOption?.value === "inactive") {
        filterPlace = filterPlace.filter(
            (i) => i.status === "Inactive"
        );
    }

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterPlace.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const GetPlaceList = async () => {
        await dispatch(reqtoSuperAdminGetPlace());
    }

    useEffect(() => {
        GetPlaceList();
    }, []);
    return (
        <>
            <section className="categorylist-section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex flex-wrap flex-xxl-nowrap align-items-center w-100">
                                    <div className="header-title col-12 col-xxl-4 d-flex align-items-center gap-3 flex-wrap mb-3 mb-xxl-0">
                                        <h2 className="m-0">Campaign &gt; Places</h2>
                                    </div>

                                    <div className="col-12 col-xxl-8 d-flex align-items-center justify-content-xxl-end gap-3 flex-wrap">
                                        <SortDropdown
                                            options={[
                                                { label: "Active", value: "active" },
                                                { label: "Inactive", value: "inactive" },
                                            ]}
                                            selected={sortOption}
                                            onChange={setSortOption}
                                        />

                                        <div className="search d-flex align-items-center gap-2">
                                            <input
                                                type="search"
                                                className="form-control form-control-sm border-0"
                                                placeholder="Search"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                autoComplete="off"
                                            />

                                            {search ? (
                                                <button className="search-cancel bg-transparent" onClick={() => setSearch("")}>
                                                    <img src={SearchClose} alt="close" />
                                                </button>
                                            ) : (
                                                <img src={Search} alt="Search" />
                                            )}
                                        </div>

                                        <button
                                            className="add-btn"
                                            onClick={() => setModalShow({ ...modalShow, addLocation: true })}
                                        >
                                            Add Location
                                        </button>
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


            {/* Add-place Modal */}
            <AddPlace show={modalShow.addPlace} handleClose={handleClose} GetPlaceList={GetPlaceList} />

            {/* Edit-Company Modal */}
            <EditPlace show={modalShow.editPlace} handleClose={handleClose} GetPlaceList={GetPlaceList} place={modalState.editPlace} />

            {/* Delete-place Modal */}
            <Delete show={modalShow.deletePlace} handleClose={handleClose} isDeleteLoading={deleteLoader} handleDelete={handleDelete} role={"Place"} />
        </>
    )
}

export default Place
