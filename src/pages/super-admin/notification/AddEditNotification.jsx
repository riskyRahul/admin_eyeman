import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loaders } from "../../../components/loader/Loader";
import {
  reqtoSuperAdminAddNotification,
  reqtoSuperAdminEditNotification,
} from "../../../pages/redux-Toolkit/services/superadmin/SuperAdminServices";

const initialState = {
  type: "Instant",
  title: "",
  message: "",
  date: "",
  time: "",
};

const AddEditNotification = ({ handleClose, data, getNotification }) => {
    console.log(data);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);

  const superAdminReducer = useSelector((state) => state.SuperAdmin);
  const { addNotificationLoader, editNotificationLoader } = superAdminReducer;

  const isView = data?.notificationType === "viewNotification";
  const isEdit = data?.notificationType === "editNotification";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        type: value,
        // Clear date and time if switching to Instant
        date: value === "Instant" ? "" : prev.date,
        time: value === "Instant" ? "" : prev.time,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.type === "Schedule") {
      if (!formData.date || !formData.time) {
        alert("Please select date and time for scheduled notification");
        return;
      }
    }

    // ✅ Send as JSON payload, not FormData
    const payload = {
      type: formData.type,
      title: formData.title,
      message: formData.message,
      date: formData.type === "Schedule" ? formData.date : "",
      time: formData.type === "Schedule" ? formData.time : "",
    };

    try {
      let res;
      if (isEdit) {
        res = await dispatch(
          reqtoSuperAdminEditNotification({ id: data._id, data: payload }),
        ).unwrap();
      } else {
        res = await dispatch(reqtoSuperAdminAddNotification(payload)).unwrap();
      }

      if (res?.success === true) {
        handleClose();
        getNotification();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        type: data.type || "Instant",
        title: data.title || "",
        message: data.message || "",
        date: data.date || "",
        time: data.time || "",
      });
    }
  }, [data]);
console.log({formData});
  return (
    <section className="categorylist-section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="col-lg-12 col-12 d-flex justify-content-between align-items-center flex-wrap p-0">
                  <div className="header-title d-flex align-items-center">
                    <h2>
                      <span
                        className="breadcrumb-link"
                        onClick={handleClose}
                        style={{ cursor: "pointer" }}
                      >
                        Notification
                      </span>
                      &gt;{" "}
                      {!data
                        ? "Add Notification"
                        : isEdit
                          ? "Edit Notification"
                          : "View Notification"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <form className="edit-user" onSubmit={handleSubmit}>
                <h2 className="title">
                  {!data
                    ? "Add Notification"
                    : isEdit
                      ? "Edit Notification"
                      : "View Notification"}
                </h2>

                {/* Type Radio Buttons */}
                <div className="col-lg-12 mb-4">
                  {/* <label className="form-label">Type</label> */}
                  <div
                    style={{
                      display: "flex",
                      gap: "24px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="form-check"
                      style={{
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginLeft: "-18px",
                      }}
                    >
                      <input
                        type="radio"
                        name="type"
                        id="typeInstant"
                        value="Instant"
                        checked={formData.type === "Instant"}
                        onChange={handleChange}
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          width: "24px",
                          height: "24px",
                          border: "2px solid #007bff",
                          borderRadius: "50%",
                          outline: "none",
                          cursor: "pointer",
                          position: "relative",
                          backgroundColor:
                            formData.type === "Instant" ? "#007bff" : "white",
                          boxShadow:
                            formData.type === "Instant"
                              ? "inset 0 0 0 4px white"
                              : "none",
                          transition: "all 0.2s ease",
                        }}
                      />
                      <label
                        htmlFor="typeInstant"
                        style={{
                          fontSize: "18px",
                          fontWeight: "500",
                          cursor: "pointer",
                          userSelect: "none",
                          margin: 0,
                        }}
                      >
                        Instant
                      </label>
                    </div>

                    <div
                      className="form-check"
                      style={{
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="radio"
                        name="type"
                        id="typeSchedule"
                        value="Schedule"
                        checked={formData.type === "Schedule"}
                        onChange={handleChange}
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          width: "24px",
                          height: "24px",
                          border: "2px solid #007bff",
                          borderRadius: "50%",
                          outline: "none",
                          cursor: "pointer",
                          position: "relative",
                          backgroundColor:
                            formData.type === "Schedule" ? "#007bff" : "white",
                          boxShadow:
                            formData.type === "Schedule"
                              ? "inset 0 0 0 4px white"
                              : "none",
                          transition: "all 0.2s ease",
                        }}
                      />
                      <label
                        htmlFor="typeSchedule"
                        style={{
                          fontSize: "18px",
                          fontWeight: "500",
                          cursor: "pointer",
                          userSelect: "none",
                          margin: 0,
                        }}
                      >
                        Schedule
                      </label>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="col-lg-12 mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter Title"
                    required
                    disabled={isView}
                  />
                </div>

                {/* Description */}
                <div className="col-lg-12 mb-4">
                  <label htmlFor="message" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter Description"
                    required
                    disabled={isView}
                  ></textarea>
                </div>

                {/* Date and Time - Only show for Schedule */}
                {formData.type === "Schedule" && (
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <label htmlFor="date" className="form-label">
                        Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        disabled={isView}
                        style={{
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onFocus={(e) => e.target.showPicker()}
                        onClick={(e) => e.target.showPicker()}
                      />
                    </div>

                    <div className="col-lg-6 mb-4">
                      <label htmlFor="time" className="form-label">
                        Time
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        disabled={isView}
                        style={{
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onFocus={(e) => e.target.showPicker()}
                        onClick={(e) => e.target.showPicker()}
                      />
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-between gap-3">
                  {!isView && (
                    <button
                      type="submit"
                      className="close-btn w-100 d-flex justify-content-center align-items-center"
                      style={{
                        opacity:
                          addNotificationLoader || editNotificationLoader
                            ? 0.7
                            : 1,
                      }}
                      disabled={addNotificationLoader || editNotificationLoader}
                    >
                      {addNotificationLoader || editNotificationLoader ? (
                        <>
                          {loaders.small}
                          {isEdit ? "Updating..." : "Submitting..."}
                        </>
                      ) : isEdit ? (
                        "Update"
                      ) : (
                        "Submit"
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    className="delete-btn w-100"
                    onClick={handleClose}
                  >
                    {isView ? "Close" : "Cancel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEditNotification;
