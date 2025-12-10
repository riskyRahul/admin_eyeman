import { useState, useEffect } from "react";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import trash from '../../../assets/images/trash.svg';
import edit from '../../../assets/images/edit.svg';
import { RiShareBoxLine } from "react-icons/ri";
import AddEditPolicies from "./AddEditPolicies";
import Delete from "../../../components/modal/delete/Delete";
import { reqtoSuperAdminDeletePolicy, reqtoSuperAdminGetPolicy } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { useDispatch, useSelector } from "react-redux";
import { CreatedDate } from "../../../utils/DateTimeFormate";

const modal = {
    addEditPolicy: false,
    deletePolicy: false,
};

const initialState = {
    editPolicy: null,
    deleteId: null,
}

const PoliciesPage = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { policyList, policyLoader, deletePolicyLoader } = superAdminReducer;

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
            name: 'Created Date',
            cell: (row) => CreatedDate(row.created_at),
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        onClick={() => {
                            setModalShow({ ...modalShow, addEditPolicy: true });
                            setModalState({ ...modalState, editPolicy: { ...row, type: 'viewPolicy' } });
                        }}
                    >
                        <RiShareBoxLine />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, addEditPolicy: true });
                            setModalState({ ...modalState, editPolicy: { ...row, type: 'editPolicy' } });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deletePolicy: true });
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

    const filteredPolicyList = (policyList || []).filter((policy) => {
        const searchString = `${policy.name} ${policy.description || ''}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredPolicyList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const GetPolicyList = async () => {
        await dispatch(reqtoSuperAdminGetPolicy());
    }

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeletePolicy(modalState.deleteId));
        if (res?.payload?.status?.success) {
            handleClose();
        }
    }

    useEffect(() => {
        GetPolicyList();
    }, [])

    return (
        <>
            {modalShow.addEditPolicy ? (
                <AddEditPolicies handleClose={handleClose} data={modalState.editPolicy} getPolicy={GetPolicyList} />
            ) : (
                <section className="categorylist-section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div className="col-lg-12 col-12 d-flex justify-content-between align-items-center flex-wrap p-0">
                                            <div className="header-title d-flex align-items-center">
                                                <h2>Policies</h2>
                                            </div>
                                            <div className="col-lg-6 col-12 d-flex justify-content-end gap-4">
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
                                                    onClick={() => setModalShow({ ...modalShow, addEditPolicy: true })}
                                                >
                                                    Add Policy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <DataTableComponents
                                        columns={columns}
                                        currentPageData={currentPageData}
                                        loader={policyLoader}
                                        filterDataLength={filteredPolicyList.length}
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
                show={modalShow.deletePolicy}
                handleClose={handleClose}
                isDeleteLoading={deletePolicyLoader}
                handleDelete={handleDelete}
                role={"Policy"} />
        </>
    );
};

export default PoliciesPage;
