import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loaders } from "../../../../loader/Loader";
import { reqtoSuperAdminAddLocation, reqtoSuperAdminCountriesWiseCountry, reqtoSuperAdminGetContinents, reqtoSuperAdminGetLocation } from "../../../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices";
import ImageUpload from "../../../imageupload/ImageUpload ";
import { FiX } from "react-icons/fi";

const initialState = {
    name: "",
    description: "",
    locationImage: null,
    locationImagePreview: null,
};

const AddLocation = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [continentId, setContinentId] = useState("");
    const [countryId, setCountryId] = useState("");
    const [countryList, setCountryList] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(false);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { continentsList, locationLoader } = superAdminReducer;

    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
        setContinentId("");
        setCountryId("");
        setCountryList([]);
    };

    const handleChange = (eOrFile) => {
        const { name, value, files } = eOrFile.target;

        if (name === "locationImage") {
            const file = files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setFormData(prev => ({
                    ...prev,
                    locationImage: file,
                    locationImagePreview: imageUrl,
                }));
            }
        } else if (name === "name") {
            setFormData(prev => ({ ...prev, name: value }));
        } else if (name === "description") {
            setFormData(prev => ({ ...prev, description: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!continentId) {
            toast.error("Please select a continent before submitting.");
            return;
        }
        if (!countryId) {
            toast.error("Please select a country before submitting.");
            return;
        }

        const payload = {
            name: formData.name,
            locationImage: formData.locationImage,
            description: formData.description,
            continentId,
            countryId,
        };

        try {
            const res = await dispatch(reqtoSuperAdminAddLocation(payload)).unwrap();

            if (res?.success === true) {
                handleCloseHide();
                dispatch(reqtoSuperAdminGetLocation());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleContinentChange = async (e) => {
        const selectedId = e.target.value;
        setContinentId(selectedId);
        setCountryList([]);
        setCountryId("");

        if (selectedId) {
            setLoadingCountries(true);
            try {
                const res = await dispatch(reqtoSuperAdminCountriesWiseCountry(selectedId)).unwrap();
                setCountryList(res.data);
            } catch (err) {
                console.error("Failed to fetch countries:", err);
            } finally {
                setLoadingCountries(false);
            }
        }
    };

    const GetContinentList = async () => {
        await dispatch(reqtoSuperAdminGetContinents());
    }

    useEffect(() => {
        GetContinentList();
    }, []);
    return (
        <>
            <Modal className="form" show={show} backdrop="static" centered>
                <div className="modal-header">
                    <h5 className="modal-title mb-4">Add Location</h5>

                    <button
                        type="button"
                        className="btn-close-icon"
                        onClick={handleCloseHide}
                    >
                        <FiX size={22} />
                    </button>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {continentsList?.length > 0 && (
                            <div className="mb-4">
                                <label htmlFor="continent" className="form-label">
                                    Continent
                                </label>
                                <select
                                    id="continent"
                                    name="continent"
                                    className="form-select"
                                    value={continentId}
                                    onChange={handleContinentChange}
                                    required
                                >
                                    <option value="">Select Continent</option>
                                    {continentsList.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="mb-4">
                            <label htmlFor="country" className="form-label">
                                Country
                            </label>
                            <select
                                id="country"
                                name="country"
                                className="form-select"
                                value={countryId}
                                onChange={(e) => setCountryId(e.target.value)}
                                disabled={!continentId || loadingCountries}
                                required
                            >
                                {!continentId ? (
                                    <option value="">Select Continent first</option>
                                ) : loadingCountries ? (
                                    <option value="">Loading...</option>
                                ) : (
                                    <>
                                        <option value="">Select Country</option>
                                        {countryList.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>

                        <ImageUpload
                            label="Location Image"
                            value={formData.locationImagePreview}
                            onChange={(file) => {
                                if (file === null) {
                                    // remove image
                                    setFormData(prev => ({
                                        ...prev,
                                        locationImage: null,
                                        locationImagePreview: null,
                                    }));
                                    return;
                                }

                                // Add image
                                const imageUrl = URL.createObjectURL(file);
                                setFormData(prev => ({
                                    ...prev,
                                    locationImage: file,
                                    locationImagePreview: imageUrl,
                                }));
                            }}
                        />

                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">
                                Location Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter Location Name"
                                autoComplete="off"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="form-label">
                                Location Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className="form-control"
                                placeholder="Enter Location description"
                                autoComplete="off"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="d-flex">
                            <button
                                type="submit"
                                className="close-btn w-100"
                                disabled={locationLoader}
                            >
                                {locationLoader ? (
                                    <>
                                        {loaders.small}
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default AddLocation
