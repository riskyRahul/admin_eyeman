import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ type, children }) => {
    // const adminToken = localStorage.getItem("admin-token");
    const superadminToken = localStorage.getItem("eyeman-superAdmin-token");

    if (type === "superadmin" && !superadminToken) {
        return <Navigate to="/" replace />;
    }

    // if (type === "admin" && !adminToken) {
    //     return <Navigate to="/admin/login" replace />;
    // }

    return children;
};

export default ProtectedRoute;