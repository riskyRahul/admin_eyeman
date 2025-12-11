import { useState, useEffect } from "react";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import { reqtoSuperAdminGetHelpCenter } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { useDispatch, useSelector } from "react-redux";
import { CreatedDate } from "../../../utils/DateTimeFormate";
import SortDropdown from "../../../components/common/SortDropdown";

const HelpCenter = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortOption, setSortOption] = useState(null);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { helpCenterList, helpCenterLoader } = superAdminReducer;

    const sortOptions = [
        { label: "Eyeman", value: "type_Eyeman" },
        { label: "Voyager", value: "type_Voyager" },
        { label: "App", value: "type_App" },
        { label: "Payment", value: "type_Payment" },
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
            cell: (row) => row?.userDetails?.name || "-",
        },
        {
            name: 'Message',
            cell: (row) => row?.message?.length > 51 ? row?.message.substring(0, 51) + '...' : row?.message || "-",
        },
        {
            name: 'Type',
            cell: (row) => row?.type || "-",
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row?.created_at),
        },
    ];

    let filteredHelpCenterList = (helpCenterList || [])?.filter((help) => {
        const searchString = `${help?.name} ${help?.type} ${help?.message || ''}`.toLowerCase();
        return searchString.includes(searchTerm?.toLowerCase());
    });

    if (sortOption) {
        const { value } = sortOption;

        if (value.startsWith("type_")) {
            const selectedCat = value.replace("type_", "");

            filteredHelpCenterList = filteredHelpCenterList?.filter(
                (item) => item?.type === selectedCat
            );
        }
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredHelpCenterList?.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const GetHelpCenterList = async () => {
        await dispatch(reqtoSuperAdminGetHelpCenter());
    }

    useEffect(() => {
        GetHelpCenterList();
    }, [])

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
                                            <h2>Help Center</h2>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTableComponents
                                    columns={columns}
                                    currentPageData={currentPageData}
                                    loader={helpCenterLoader}
                                    filterDataLength={filteredHelpCenterList.length}
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
        </>
    )
}

export default HelpCenter
