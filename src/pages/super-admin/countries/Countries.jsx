import DataTableComponents from "../../../components/data-table/DataTableComponents";
import Search from '../../../assets/images/search.svg';
import SearchClose from '../../../assets/images/search_close.svg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    reqtoSuperAdminCountriesWiseCountry,
    reqtoSuperAdminGetContinents,
    reqtoSuperAdminGetCountries
} from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { useParams } from "react-router";
import SortDropdown from "../../../components/common/SortDropdown";

const Countries = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const {
        countriesList,
        loader,
        countriesWiseCountryList,
        countriesWiseCountryLoader,
        continentsList
    } = superAdminReducer;

    const [selectedContinent, setSelectedContinent] = useState(null);
    const [search, setSearch] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '80px',
        },
        { name: 'Name', cell: (row) => row?.name || "-" },
        { name: 'Continent', cell: (row) => row?.continent || "-" },
        { name: 'Latitude', cell: (row) => row?.latitude || "-" },
        { name: 'Longitude', cell: (row) => row?.longitude || "-" },
        { name: 'Currency', cell: (row) => row?.currency || "-" },
    ];

    const sortOptions = [
        ...((continentsList || []).map(item => ({
            label: item.name,
            value: item._id
        })))
    ];

    const finalCountries = (selectedContinent?.value || id)
        ? countriesWiseCountryList
        : countriesList;

    const filtered = (finalCountries || []).filter((i) => {
        const searchStr = `${i.name} ${i.continent} ${i.isoCode} ${i.currency}`.toLowerCase();
        return searchStr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filtered.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => setCurrentPage(page);

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const GetContinentList = async () => {
        try {
            await dispatch(reqtoSuperAdminGetContinents());
        } catch (err) {
            console.error("Failed to fetch continents:", err);
        }
    };

    useEffect(() => {
        if (selectedContinent === null) return;

        const selectedId = selectedContinent.value;

        if (!selectedId) {
            dispatch(reqtoSuperAdminGetCountries());
        } else {
            dispatch(reqtoSuperAdminCountriesWiseCountry(selectedId));
        }
    }, [selectedContinent]);

    useEffect(() => {
        if (id) {
            dispatch(reqtoSuperAdminCountriesWiseCountry(id));
        } else {
            dispatch(reqtoSuperAdminGetCountries());
        }
        GetContinentList();
    }, [id, dispatch]);

    return (
        <section className="categorylist-section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <div className="col-lg-12 col-12 d-flex justify-content-between align-items-center flex-wrap p-0">
                                    <div className="header-title d-flex align-items-center">
                                        <h2>Campaign &gt; Country</h2>
                                    </div>

                                    <div className="col-12 d-flex justify-content-end gap-4">
                                        <SortDropdown
                                            options={sortOptions}
                                            selected={selectedContinent}
                                            onChange={setSelectedContinent}
                                        />

                                        <div className="search d-flex align-items-center gap-1">
                                            <input
                                                type="search"
                                                className="form-control form-control-sm border-0"
                                                placeholder="Search"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            {search ? (
                                                <button
                                                    className="search-cancel bg-transparent"
                                                    onClick={() => setSearch("")}
                                                >
                                                    <img src={SearchClose} alt="Search" />
                                                </button>
                                            ) : (
                                                <img src={Search} alt="Search" />
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <DataTableComponents
                                columns={columns}
                                currentPageData={currentPageData}
                                loader={countriesWiseCountryLoader || loader}
                                filterDataLength={filtered.length}
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
    );
};

export default Countries
