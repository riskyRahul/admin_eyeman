import { useState } from "react";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import { InputSwitch } from "primereact/inputswitch";
import trash from '../../../assets/images/trash.svg';
import sort_by from '../../../assets/images/sort_by.svg';
import { RiShareBoxLine } from "react-icons/ri";
import AddTeamRole from "../../../components/modal/super-admin/teamRole/AddTeamRole";
import { CreatedDate } from "../../../utils/DateTimeFormate";

const modal = {
    addUser: false,
};

const TeamRole = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalShow, setModalShow] = useState(modal);

    const userList = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", created_at: "2025-11-20T04:35:38.313Z" },
        { id: 2, name: "Jane Doe", email: "jane@example.com", role: "User", status: "Inactive", created_at: "2025-11-20T04:35:38.313Z" },
    ];

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
            // width: "170px",
        },
        {
            name: 'Email',
            cell: (row) => row?.email || "-",
            // width: "300px",
        },
        {
            name: 'Role',
            cell: (row) => row?.role || "-",
            // width: "150px",
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
                        className="custom-switch-btn"
                    />
                </div>
            ),
            // width: '150px',
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns">
                        <RiShareBoxLine />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon">
                        <img src={trash} alt="trash" />
                    </button>
                </div>
            ),
            // width: '150px',
            center: "true"
        },
    ];

    const filteredUserList = (userList || []).filter((user) => {
        const searchString = `${user.name} ${user.email} ${user.role || ''} ${user.status || ''}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredUserList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
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
                                            <h2>Team Roles</h2>
                                        </div>
                                        <div className="col-lg-6 col-12 d-flex justify-content-end gap-4">
                                            <button className="d-flex align-items-center w-100 justify-content-center" style={{ maxWidth: '134px', gap: '10px', backgroundColor: '#F6F6F6', borderRadius: '100px' }}>
                                                <img src={sort_by} alt="sort_by" />
                                                <span style={{ fontSize: '16px', fontWeight: '400', color: '#676767' }}>Sort by</span>
                                            </button>
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
                                                onClick={() => setModalShow({ ...modalShow, addUser: true })}
                                            >
                                                Add User
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTableComponents
                                    columns={columns}
                                    currentPageData={currentPageData}
                                    loader={false}
                                    filterDataLength={filteredUserList.length}
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

            <AddTeamRole show={modalShow.addUser} handleClose={() => setModalShow({ ...modalShow, addUser: false })} />
        </>
    );
};

export default TeamRole;
