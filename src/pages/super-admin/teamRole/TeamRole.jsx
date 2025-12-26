import { useEffect, useState } from "react";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import { InputSwitch } from "primereact/inputswitch";
import trash from '../../../assets/images/trash.svg';
import { RiShareBoxLine } from "react-icons/ri";
import edit from '../../../assets/images/edit.svg';
import AddTeamRole from "../../../components/modal/super-admin/teamRole/AddTeamRole";
import { CreatedDate } from "../../../utils/DateTimeFormate";
import SortDropdown from "../../../components/common/SortDropdown";
import { useDispatch, useSelector } from "react-redux";
import { 
    reqtoSuperAdminDeleteTeam, 
    reqtoSuperAdminGetTeam,
    reqtoSuperAdminStatusTeam 
} from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import Delete from "../../../components/modal/delete/Delete";

const modal = {
    AddTeamRole: false,
    deleteTeam: false,
};

const initialState = {
    editTeam: null,
    deleteId: null,
}

const TeamRole = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);
    const [sortOption, setSortOption] = useState(null);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { teamList, teamLoader, deleteTeamLoader } = superAdminReducer;

    const sortOptions = [
        { label: "Sub Admin", value: "role_SubAdmin" },
        { label: "Marketing", value: "role_Marketing" },
        { label: "Financial", value: "role_Financial" },
        { label: "Support", value: "role_Support" },
        { label: "Developer", value: "role_Developer" },
    ];

    const handleStatusToggle = async (row) => {
        await dispatch(reqtoSuperAdminStatusTeam({ 
            id: row._id,
            data: {} 
        }));
        GetTeamList();
    };

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * itemsPerPage + (index + 1),
            width: '80px',
            maxwidth: '80px',
        },
        {
            name: 'Name',
            cell: (row) => row?.name || "-",
        },
        {
            name: 'Email',
            cell: (row) => row?.email || "-",
        },
        {
            name: 'Role',
            cell: (row) => row?.role || "-",
            width: "150px",
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row.created_at),
            width: "180px",
        },
        {
            name: 'Status',
            cell: (row) => (
                <div>
                    <InputSwitch
                        checked={row.status === "Active"}
                        className="custom-switch-btn"
                        onChange={() => handleStatusToggle(row)}
                    />
                </div>
            ),
            width: '120px',
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <button 
                        type="button" 
                        className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        onClick={() => {
                            setModalShow({ ...modalShow, AddTeamRole: true });
                            setModalState({ ...modalState, editTeam: { ...row, type: 'viewTeam' } });
                        }}
                    >
                        <RiShareBoxLine />
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, AddTeamRole: true });
                            setModalState({ ...modalState, editTeam: { ...row, type: 'editTeam' } });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteTeam: true });
                            setModalState({ ...modalState, deleteId: row._id });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>
                </div>
            ),
            width: '200px',
            center: "true"
        },
    ];

    let filteredTeamList = (teamList || []).filter((team) => {
        const searchString = `${team.name} ${team.email} ${team.role || ''} ${team.status || ''}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    if (sortOption) {
        const { value } = sortOption;

        if (value.startsWith("role_")) {
            const selectedRole = value.replace("role_", "");

            filteredTeamList = filteredTeamList.filter(
                (item) => item.role === selectedRole
            );
        }
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredTeamList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const GetTeamList = async () => {
        await dispatch(reqtoSuperAdminGetTeam());
    }

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeleteTeam(modalState.deleteId));
        if (res?.payload?.status?.success) {
            handleClose();
            GetTeamList();
        }
    }

    useEffect(() => {
        GetTeamList();
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
                                        <h2 className="m-0">Team Management</h2>
                                    </div>

                                    <div className="col-12 col-xxl-8 d-flex align-items-center justify-content-xxl-end gap-3 flex-wrap">
                                        <SortDropdown
                                            options={sortOptions}
                                            selected={sortOption}
                                            onChange={(opt) => setSortOption(opt)}
                                        />
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
                                        <button 
                                            className="add-btn boreder-0" 
                                            type="button"
                                            onClick={() => setModalShow({ ...modalShow, AddTeamRole: true })}
                                        >
                                            Add Team Member
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTableComponents
                                    columns={columns}
                                    currentPageData={currentPageData}
                                    loader={teamLoader}
                                    filterDataLength={filteredTeamList.length}
                                    perPage={itemsPerPage}
                                    noDataTable="No Team Members Found"
                                    handleRowsPerPageChange={handleRowsPerPageChange}
                                    handlePageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AddTeamRole
                show={modalShow.AddTeamRole}
                handleClose={handleClose}
                data={modalState.editTeam}
                getTeam={GetTeamList}
            />

            <Delete
                show={modalShow.deleteTeam}
                handleClose={handleClose}
                isDeleteLoading={deleteTeamLoader}
                handleDelete={handleDelete}
                role={"Team Member"} 
            />
        </>
    );
};

export default TeamRole;