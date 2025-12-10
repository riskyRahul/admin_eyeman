import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SuperAdminSidebar } from '../sidebar/Sidebar';
import {  SuperAdminHeader } from '../header/Header';
// import Logout from '../modal/logout/Logout';
// import { logout } from '../../redux-Toolkit/slices/superadmin/AuthSlice';
// import { reqtoAdminLogout } from '../../redux-Toolkit/services/admin/AuthServices';

{/* ----- Super-Admin ----- */ }
export const SuperAdminLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("eyeman-superAdmin-token");

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token]);


    const [mobileToggle, setMobileToggle] = useState(false);

    // Logout-Modal
    const [logoutModalShow, setLogoutModalShow] = useState(false);
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);

    const handleLogout = () => {
        setLogoutModalShow(true);
    }

    // const handleClose = () => {
    //     setLogoutModalShow(false);
    // }

    // const confirmLogout = async () => {
    //     setIsLogoutLoading(true);

    //     setTimeout(() => {
    //         dispatch(logout());
    //         navigate("/");
    //         setIsLogoutLoading(false);
    //     }, 500);
    // }

    return (
        <>
            <div className="layout">
                <div className="main-section">
                    <div className="layout has-sidebar fixed-sidebar fixed-header">
                        <SuperAdminSidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                        <div className="layout">
                            <main className="content">
                                <div>
                                    <SuperAdminHeader mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />
                                    <Outlet />
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Modal */}
            {/* <Logout show={logoutModalShow} handleClose={handleClose} isLogoutLoading={isLogoutLoading} handleLogout={confirmLogout} /> */}
        </>
    )
}