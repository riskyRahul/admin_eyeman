import { useEffect, useState } from "react";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import trash from '../../../assets/images/trash.svg';
import { RiShareBoxLine } from "react-icons/ri";
import AddEditFAQ from "../../../components/modal/super-admin/faq/AddEditFAQ";
import sort_by from '../../../assets/images/sort_by.svg';
import edit from '../../../assets/images/edit.svg';
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminDeleteFaqs, reqtoSuperAdminGetFaqs } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import Delete from "../../../components/modal/delete/Delete";
import SortDropdown from "../../../components/common/SortDropdown";

const modal = {
    addEditFaqs: false,
    deleteFaqs: false,
};

const initialState = {
    editFaqs: null,
    deleteId: null,
}

const FAQ = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);
    const [sortOption, setSortOption] = useState(null);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { faqsList, faqsLoader, deleteFaqsLoader } = superAdminReducer;

    const sortOptions = [
        { label: "Technical", value: "category_Technical" },
        { label: "Eyeman", value: "category_Eyeman" },
        { label: "General", value: "category_General" },
        { label: "Voyager", value: "category_Voyager" },
    ];

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * itemsPerPage + (index + 1),
            width: '80px',
            maxwidth: '80px',
        },
        {
            name: 'Question',
            cell: (row) => row?.question || "-",
        },
        {
            name: 'Answer',
            cell: (row) => {
                const asn = row.answer;
                return asn?.length > 51 ? asn.substring(0, 51) + '...' : asn;
            },
        },
        {
            name: 'Category',
            cell: (row) => row?.category || "-",
            width: "200px",
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        onClick={() => {
                            setModalShow({ ...modalShow, addEditFaqs: true });
                            setModalState({ ...modalState, editFaqs: { ...row, type: 'viewFaqs' } });
                        }}
                    >
                        <RiShareBoxLine />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, addEditFaqs: true });
                            setModalState({ ...modalState, editFaqs: { ...row, type: 'editFaqs' } });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteFaqs: true });
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

    let filteredFAQList = (faqsList || []).filter((faq) => {
        const searchString = `${faq.question} ${faq.answer} ${faq.category || ''}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    if (sortOption) {
        const { value } = sortOption;

        if (value.startsWith("category_")) {
            const selectedCat = value.replace("category_", "");

            filteredFAQList = filteredFAQList.filter(
                (item) => item.category === selectedCat
            );
        }
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredFAQList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const GetFaqsList = async () => {
        await dispatch(reqtoSuperAdminGetFaqs());
    }

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeleteFaqs(modalState.deleteId));
        if (res?.payload?.status?.success) {
            handleClose();
        }
    }

    useEffect(() => {
        GetFaqsList();
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
                                        <div className="header-title d-flex align-items-center">
                                            <h2>FAQ’s (Frequently Asked Questions)</h2>
                                        </div>
                                        <div className="col-lg-6 col-12 d-flex justify-content-end gap-4">
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
                                            <button className="add-btn boreder-0" type="button"
                                                onClick={() => setModalShow({ ...modalShow, addEditFaqs: true })}
                                            >
                                                Add FAQ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTableComponents
                                    columns={columns}
                                    currentPageData={currentPageData}
                                    loader={faqsLoader}
                                    filterDataLength={filteredFAQList.length}
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

            <AddEditFAQ
                show={modalShow.addEditFaqs}
                handleClose={handleClose}
                data={modalState.editFaqs}
                getFaqs={GetFaqsList}
            />

            <Delete
                show={modalShow.deleteFaqs}
                handleClose={handleClose}
                isDeleteLoading={deleteFaqsLoader}
                handleDelete={handleDelete}
                role={"Faqs"} />
        </>
    );
};

export default FAQ;
