import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminDeleteUser, reqtoSuperAdminGetVoyager, reqtoSuperAdminStatusUser } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import User from "../../../assets/images/user.png"
import { InputSwitch } from "primereact/inputswitch";
import trash from '../../../assets/images/trash.svg';
import eye_coins from '../../../assets/images/eye-coins.svg';
import sort_by from '../../../assets/images/sort_by.svg';
import { RiShareBoxLine } from "react-icons/ri";
import Delete from "../../../components/modal/delete/Delete";
import ViewVoyager from "../../../components/modal/super-admin/voyager/ViewVoyager";
import SortDropdown from "../../../components/common/SortDropdown";

const modal = {
    deleteUser: false,
    viewUser: false,
}

const initialState = {
    deleteId: null,
    viewId: null,
}

const Voyager = () => {
    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { voyagerList, loader, deleteUserLoader } = superAdminReducer;

    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);

    const handleStatusChange = async (Uid) => {
        await dispatch(reqtoSuperAdminStatusUser({ id: Uid }));
    }

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '80px',
            maxwidth: '80px',
        },
        {
            name: 'Image',
            cell: (row) => (
                <div className="">
                    <img
                        src={row.logo || User}
                        alt="Image"
                        className={``}
                        style={{
                            maxWidth: "60px",
                            maxHeight: "60px",
                            padding: '8px 0'
                        }}
                    />
                </div>
            ),
            width: "110px",
        },
        {
            name: 'Name',
            cell: (row) => row?.name || "-",
            width: "170px",
        },
        {
            name: 'Email',
            cell: (row) => row?.email || "-",
            width: "300px",
        },
        {
            name: 'Total Earn',
            cell: (row) => (
                <div className="d-flex gap-2 align-items-center w-100">
                    <div>1000</div>
                    <img src={eye_coins} alt="eye_coins" />
                    <div>Coins</div>
                </div>
            ),
            wrap: true,
            style: { minWidth: '200px' },
        },
        {
            name: 'Total Spent',
            cell: (row) => (
                <div className="d-flex gap-2 align-items-center">
                    <div>1000</div>
                    <img src={eye_coins} alt="eye_coins" />
                    <div>Coins</div>
                </div>
            ),
            wrap: true,
            style: { minWidth: '200px' },
        },
        {
            name: 'Status',
            cell: (row) => (
                <div>
                    <InputSwitch
                        checked={row.profile_status?.toLowerCase() === "active"}
                        onChange={() => handleStatusChange(row?._id)}
                        className="custom-switch-btn"
                    />
                </div>
            ),
            width: '150px',
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        onClick={() => {
                            setModalShow({ ...modalShow, viewUser: true });
                            setModalState({ ...modalState, viewId: row._id });
                        }}
                    >
                        <RiShareBoxLine />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteUser: true });
                            setModalState({ ...modalState, deleteId: row._id });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>
                </div>
            ),
            width: '150px',
            center: "true"
        },
    ];

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    const filtered = (voyagerList || []).filter((i) => {
        const s = `${i.name} ${i.email} ${i.country} ${i.phone_number}`.toLowerCase();
        return s.includes(search.toLowerCase());
    });

    let filterVoyager = [...filtered];

    if (sortOption?.value === "active") {
        filterVoyager = filterVoyager.filter(
            (i) => i.profile_status?.toLowerCase() === "active"
        );
    }

    if (sortOption?.value === "inactive") {
        filterVoyager = filterVoyager.filter(
            (i) => i.profile_status?.toLowerCase() === "inactive"
        );
    }

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterVoyager.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const GetVoyagerList = async () => {
        await dispatch(reqtoSuperAdminGetVoyager());
    }

    useEffect(() => {
        GetVoyagerList();
    }, []);

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeleteUser(modalState.deleteId));

        if (res?.payload?.status?.success) {
            handleClose();
        }
    };

    return (
        <>
            <section className="categorylist-section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="col-lg-12 col-12 d-flex justify-content-between align-items-center flex-wrap p-0">
                                        <div className="header-title d-flex align-items-center">
                                            <h2>Eyeman - Voyager</h2>
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
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTableComponents
                                    columns={columns}
                                    currentPageData={currentPageData}
                                    loader={loader}
                                    filterDataLength={filterVoyager?.length || 0}
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

            <ViewVoyager
                show={modalShow.viewUser}
                id={modalState.viewId}
                handleClose={handleClose}
            />

            <Delete
                show={modalShow.deleteUser}
                handleClose={handleClose}
                isDeleteLoading={deleteUserLoader}
                handleDelete={handleDelete}
                role={"Voyager"} />
        </>
    )
}

export default Voyager
