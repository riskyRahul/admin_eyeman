import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import User from "../../assets/images/User.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { getNameInitials } from "../../utils";
// import { reqtoAdminViewUser } from "../../redux-Toolkit/services/admin/AdminServices";

// const initialState = {
//   name: "",
// };

export const SuperAdminHeader = ({
  mobileToggle,
  setMobileToggle,
  handleLogout,
}) => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");

  const handleLogouts = () => {
    localStorage.removeItem("eyeman-superAdmin-token");
  }

  useEffect(() => {
    if (pathname.startsWith("/superadmin/")) {
      const path = pathname.replace("/superadmin", "");

      if (path === "/dashboard") {
        setTitle("Dashboard");
      }
      if (path.startsWith("/continents")) {
        setTitle("Continents");
      }
      if (path === "/countries") {
        setTitle("Countries");
      }
      if (path.startsWith("/place")) {
        setTitle("Place");
      }
      if (path.startsWith("/source")) {
        setTitle("Source");
      }
      if (path === "/company") {
        setTitle("Add partner");
      }
      if (path === "/category") {
        setTitle("Add Case Type");
      }
      if (path === "/applicant") {
        setTitle("Add Applicant");
      }
      if (path === "/intake") {
        setTitle("Add Intake");
      }
      if (path === "/help-Support") {
        setTitle("Help & Support");
      }
    }
  }, [pathname]);

  // const firstLetter = (title || "A").charAt(0).toUpperCase();

  return (
    <div className="nav navbar navbar-expand-xl navbar-light iq-navbar">
      <div className="container-fluid navbar-inner">
        <div className="">
          <h6 className="site-menu-title mb-0 gap-4 d-flex align-items-center">
            {/* {title || ""} */}
            Super Admin
          </h6>
          <p className="site-menu-text">
            admin@eyeman.com</p>
        </div>

        <ul className="navbar-nav navbar-list ms-auto">
          <li className="nav-item dropdown">
            <Link
              className="nav-link d-flex align-items-center position-relative ps-3 p-0"
              href="#"
              id="profile-dropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                style={{

                }}
                className="profile"
              >
                SA
              </div>

            </Link>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profile-dropdown"
            >
              <li onClick={() => handleLogouts()}>
                <Link className="dropdown-item" style={{ fontWeight: "600" }}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <button
          id="btn-toggle"
          className="border-0 sidebar-toggler break-point-sm btn-line"
          onClick={() => setMobileToggle(!mobileToggle)}
        >
          <i className="ri-menu-line ri-xl" />
        </button>
      </div>
    </div>
  );
};