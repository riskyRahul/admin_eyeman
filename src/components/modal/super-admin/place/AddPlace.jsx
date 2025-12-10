import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loaders } from "../../../loader/Loader";
import { validateField } from "../../../../utils/FormValidations";
import { reqtoSuperAdminAddPlace, reqtoSuperAdminCountriesWiseCountry, reqtoSuperAdminGetContinents, reqtoSuperAdminGetCountries } from "../../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices";
import ImageUpload from "../../imageupload/ImageUpload ";
// import { reqtoSuperAdminAddPlace, reqtoSuperAdminGetCountries } from "your-path";

const initialState = {
    name: "",
    placeImage: null,
    placeImagePreview: null,
};

const AddPlace = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [nameError, setNameError] = useState("");
    const [continentId, setContinentId] = useState("");
    const [countryId, setCountryId] = useState("");
    const [countryList, setCountryList] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(false);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { continentsList } = superAdminReducer;

    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
        setContinentId("");
        setCountryId("");
        setCountryList([]);
        setNameError("");
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "placeImage") {
            const file = files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setFormData((prev) => ({
                    ...prev,
                    placeImage: file,
                    placeImagePreview: imageUrl,
                }));
            }
        } else if (name === "name") {
            setFormData((prev) => ({ ...prev, name: value }));
            setNameError(validateField("name", value));
        }
    };

    // 🌍 When Continent Changes
    const handleContinentChange = async (e) => {
        const selectedId = e.target.value;
        setContinentId(selectedId);
        setCountryList([]);
        setCountryId("");

        if (selectedId) {
            console.log(selectedId)
            setLoadingCountries(true);
            try {
                // 👇 Replace this with your actual Redux API call
                const res = await dispatch(reqtoSuperAdminCountriesWiseCountry(selectedId)).unwrap();
                setCountryList(res.data);

                // Temporary fake API data for demo:
                // const fakeResponse = [
                //     { _id: "c1", name: "India" },
                //     { _id: "c2", name: "China" },
                //     { _id: "c3", name: "Japan" },
                // ];
                // await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
                // setCountryList(fakeResponse);
            } catch (err) {
                console.error("Failed to fetch countries:", err);
            } finally {
                setLoadingCountries(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!continentId) {
            alert("Please select a continent before submitting.");
            return;
        }
        if (!countryId) {
            alert("Please select a country before submitting.");
            return;
        }

        const payload = {
            name: formData.name,
            placeImage: formData.placeImage,
            continentId,
            countryId,
        };

        console.log("Submitting payload:", payload);
        dispatch(reqtoSuperAdminAddPlace(payload));
        handleCloseHide();
    };

    const GetContinentList = async () => {
        await dispatch(reqtoSuperAdminGetContinents());
    }

    useEffect(() => {
        GetContinentList();
    }, []);

    return (
        <Modal className="form" show={show} backdrop="static" centered>
            <div className="modal-header">
                <h5 className="modal-title mb-4">Add Place</h5>
            </div>

            <div className="modal-body">
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                            Name :
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter Place Name"
                            autoComplete="off"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {nameError && <small className="text-danger">{nameError}</small>}
                    </div>


                    {/* <div className="mb-4">
                        <label className="form-label">Place Image :</label>

                        <div
                            className="upload-box text-center"
                            onClick={() => document.getElementById("placeImage").click()}
                        >
                            <div className="upload-icon">
                                <i className="fa-regular fa-image" style={{ fontSize: "40px" }}></i>
                            </div>

                            <p className="upload-text">Click to upload image</p>
                            <p className="upload-subtext">JPG, JPEG, PNG</p>

                            <input
                                type="file"
                                id="placeImage"
                                name="placeImage"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />
                        </div>

                        {formData.placeImagePreview && (
                            <div className="mt-3 text-center">
                                <img
                                    src={formData.placeImagePreview}
                                    alt="Preview"
                                    className="img-fluid rounded"
                                    style={{
                                        maxHeight: "120px",
                                        border: "1px solid #ddd",
                                        padding: "5px",
                                    }}
                                />
                            </div>
                        )}
                    </div> */}
                    <ImageUpload
                        label="placeImage"
                        value={formData.placeImagePreview}
                        onChange={(file) => {
                            const imageUrl = URL.createObjectURL(file);
                            setFormData((prev) => ({
                                ...prev,
                                placeImage: file,
                                placeImagePreview: imageUrl,
                            }));
                        }}
                    />

                    {continentsList?.length > 0 && (
                        <div className="mb-4">
                            <label htmlFor="continent" className="form-label">
                                Continent :
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
                            Country :
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


                    <div className="d-flex justify-content-between">
                        <button type="submit" className="close-btn">
                            Submit
                        </button>
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={handleCloseHide}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddPlace;
