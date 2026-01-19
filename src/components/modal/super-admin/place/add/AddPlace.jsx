import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices";
import ImageUpload from "../../../imageupload/ImageUpload ";
import { FiX } from "react-icons/fi";
import { loaders } from "../../../../loader/Loader";
import { validateField } from "../../../../../utils/FormValidations";
import {
  reqtoSuperAdminCountriesWiseCountry,
  reqtoSuperAdminAddPlace,
  reqtoSuperAdminGetContinents,
  reqtoSuperAdminGetCountries,
} from "../../../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices";

const initialState = {
  name: "",
  lat: "",
  long: "",
  placeImage: null,
  placeImagePreview: null,
};

const AddPlace = ({ show, handleClose, GetPlaceList }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [nameError, setNameError] = useState("");
  const [continentId, setContinentId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  const superAdminReducer = useSelector((state) => state.SuperAdmin);
  const { continentsList, placeLoader } = superAdminReducer;

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
    } else if (name === "lat" || name === "long") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🌍 When Continent Changes
  const handleContinentChange = async (e) => {
    const selectedId = e.target.value;
    setContinentId(selectedId);
    setCountryList([]);
    setCountryId("");

    if (selectedId) {
      setLoadingCountries(true);
      try {
        const res = await dispatch(
          reqtoSuperAdminCountriesWiseCountry(selectedId)
        ).unwrap();
        setCountryList(res.data);
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

    // ✅ Create FormData for file upload
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("lat", parseFloat(formData.lat) || 0);
    payload.append("long", parseFloat(formData.long) || 0);
    payload.append("continentId", continentId);
    payload.append("countryId", countryId);

    if (formData.placeImage) {
      payload.append("placeImage", formData.placeImage);
    }
    // ✅ LOG FORM DATA
    console.log("---- Final Payload With Types ----");
    for (let [key, value] of payload.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, value, `(type: File, mime: ${value.type})`);
      } else {
        console.log(`${key}:`, value, `(JS type: ${typeof value})`);
      }
    }
    console.log("----------------------------------");

    try {
      const res = await dispatch(reqtoSuperAdminAddPlace(payload)).unwrap();

      if (res?.success === true) {
        handleCloseHide();
        GetPlaceList();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const GetContinentList = async () => {
    await dispatch(reqtoSuperAdminGetContinents());
  };

  useEffect(() => {
    GetContinentList();
  }, []);

  return (
    <Modal className="form" show={show} backdrop="static" centered>
      <div className="modal-header">
        <h5 className="modal-title mb-4">Add Place</h5>

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
            label="Place Image"
            value={formData.placeImagePreview}
            onChange={(file) => {
              if (file === null) {
                // Remove image
                setFormData((prev) => ({
                  ...prev,
                  placeImage: null,
                  placeImagePreview: null,
                }));
                return;
              }

              // Add image
              const imageUrl = URL.createObjectURL(file);
              setFormData((prev) => ({
                ...prev,
                placeImage: file,
                placeImagePreview: imageUrl,
              }));
            }}
          />

          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Place Name
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

          <div className="mb-4">
            <label htmlFor="lat" className="form-label">
              Latitude
            </label>
            <input
              type="number"
              id="lat"
              name="lat"
              step="any"
              className="form-control"
              placeholder="Enter Latitude (e.g., 27.1751)"
              autoComplete="off"
              value={formData.lat}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="long" className="form-label">
              Longitude
            </label>
            <input
              type="number"
              id="long"
              name="long"
              step="any"
              className="form-control"
              placeholder="Enter Longitude (e.g., 78.0421)"
              autoComplete="off"
              value={formData.long}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="close-btn" disabled={placeLoader}>
              {placeLoader ? (
                <>
                  {loaders.small}
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
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
