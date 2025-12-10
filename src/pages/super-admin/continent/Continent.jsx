import { CreatedDate } from "../../../utils/DateTimeFormate";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminGetContinents } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { useNavigate } from "react-router";

const Continent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { continentsList, loader, deleteLoader } = superAdminReducer;


    const [search, setSearch] = useState("");
    const [continentFilter, setContinentFilter] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '80px',
            maxwidth: '80px',
        },
        {
            name: 'Name',
            cell: (row) => row?.name || "-",
            width: "300px",
        },
        {
            name: 'Country',
            cell: (row) => (
                <button style={{ backgroundColor: 'transparent', textDecoration: 'underline' }} onClick={() => navigate(`/superadmin/countries/${row._id}`)}>
                    {row?.countryCount || '-'}
                </button>
            ),
            width: "600px",
        },
    ];

    const filterContinent = (continentsList || []).filter((i) => {
        const searchstr = `${i.name} ${CreatedDate(i.created_at)}`.toLowerCase();
        const matchesSearch = searchstr.includes(search.toLowerCase());
        return matchesSearch;
    });


    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterContinent.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const GetContinentList = async () => {
        await dispatch(reqtoSuperAdminGetContinents());
    }

    useEffect(() => {
        GetContinentList();
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
                                            <h2>Campaign &gt; Continent</h2>
                                        </div>
                                        <div className="col-lg-6 col-12 d-flex justify-content-end">
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
                                    filterDataLength={filterContinent?.length || 0}
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
        </>
    )
}

export default Continent
