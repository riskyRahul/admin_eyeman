import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import AddEditSetting from "./AddEditSetting";
import { reqtoSuperAdminGetSettings } from "../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { useDispatch, useSelector } from "react-redux";

const modal = {
  addEditSetting: false,
};

const initialState = {
  editSetting: null,
};

const SettingPage = () => {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(modal);
  const [modalState, setModalState] = useState(initialState);

  const superAdminReducer = useSelector((state) => state.SuperAdmin);
  const { settingsList, settingsLoader } = superAdminReducer;

  const GetSettingList = async () => {
    await dispatch(reqtoSuperAdminGetSettings());
  };

  const handleClose = () => {
    setModalShow(modal);
    setModalState(initialState);
  };

  useEffect(() => {
    GetSettingList();
  }, []);

  return (
    <>
      {modalShow.addEditSetting ? (
        <AddEditSetting
          handleClose={handleClose}
          data={modalState.editSetting}
          getSettings={GetSettingList}
        />
      ) : (
        <section className="categorylist-section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="col-lg-12 col-12 d-flex justify-content-between align-items-center flex-wrap p-0">
                      <div className="header-title d-flex align-items-center">
                        <h2>Setting</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {settingsLoader ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : settingsList && settingsList.length > 0 ? (
                    settingsList.map((setting, index) => (
                      <div
                        className="col-lg-4 col-md-6 mb-4"
                        key={setting._id || index}
                      >
                        <div className="card h-100">
                          <div
                            className="card-body d-flex flex-column justify-content-between shadow-sm"
                            style={{
                              border: "1px solid #CDCDCD",
                              borderRadius: "5.25px",
                            }}
                          >
                            <div>
                              <h6
                                className="text-muted mb-2"
                                style={{
                                  fontSize: "14px",
                                  width: "60%",
                                  color: "var(--black-text)",
                                }}
                              >
                                {setting.title}
                              </h6>
                              <h4
                                className="mb-0"
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "600",
                                  color: "var(--black-text)",
                                }}
                              >
                                {setting.value} {setting.valueType}
                              </h4>
                            </div>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "36px",
                                height: "36px",
                                position: "absolute",
                                top: "16px",
                                right: "16px",
                                padding: "0",
                              }}
                              onClick={() => {
                                setModalShow({
                                  ...modalShow,
                                  addEditSetting: true,
                                });
                                setModalState({
                                  ...modalState,
                                  editSetting: setting,
                                });
                              }}
                            >
                              <FiEdit2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div className="text-center py-5">
                        <p className="text-muted">No settings found</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SettingPage;
