import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SidebarData } from '../constants/Data';
import Logo from "../../assets/images/logo.svg";
import { IoChevronDownSharp } from "react-icons/io5";

export const SuperAdminSidebar = ({ mobileToggle, setMobileToggle, handleLogout }) => {
    const { pathname } = useLocation();
    const [openIndex, setOpenIndex] = useState(null);

    const handleSidebarDismiss = () => {
        // Only auto-close on mobile (below 1024px)
        if (window.innerWidth < 1024) {
            setMobileToggle(false);
        }
    };

    useEffect(() => {
        const parentIndex = SidebarData?.superadmin?.findIndex(item => {
            return item.children?.some(child => pathname.startsWith(child.route));
        });

        if (parentIndex !== -1) {
            setOpenIndex(parentIndex);
        } else {
            setOpenIndex(null);
        }
    }, [pathname]);

    // Handle window resize to auto-show sidebar on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileToggle(true); // Always show on desktop
            } else {
                setMobileToggle(false); // Hide on mobile by default
            }
        };

        // Set initial state
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setMobileToggle]);

    const handleParentClick = (e, index) => {
        e.preventDefault();
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <>
            {/* Overlay for mobile */}
            {mobileToggle && window.innerWidth < 1024 && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setMobileToggle(false)}
                />
            )}

            <aside 
                id="sidebar" 
                className={`sidebar break-point-sm has-bg-image ${mobileToggle ? "toggled" : ""}`}
            >
                <div className="sidebar-layout">
                    <div className="sidebar-header">
                        <Link to="/superadmin/dashboard" className="pro-sidebar-logo admin" onClick={handleSidebarDismiss}>
                            <img src={Logo} alt="SuperAdmin logo" className="full-fluid" width={80} />
                        </Link>
                    </div>

                    <nav className="menu open-current-submenu">
                        <ul>
                            {
                                SidebarData?.superadmin?.map((i, index) => {
                                    const hasChildren = i.children && i.children.length > 0;
                                    return (
                                        <li
                                            className={`menu-item ${openIndex === index ? "menu-open" : ""}`}
                                            key={index}
                                        >
                                            {
                                                i.onClick === "logout" ? (
                                                    <Link
                                                        onClick={i?.onClick === "logout" ? handleLogout : null}
                                                    >
                                                        <span className="menu-icon">
                                                            {i.icon}
                                                        </span>
                                                        <span className="menu-title">
                                                            {i.label}
                                                        </span>
                                                    </Link>
                                                ) : hasChildren ? (
                                                    <>
                                                        <NavLink
                                                            className="d-flex align-items-center justify-content-between dropdown mb-2 bg-transparent"
                                                            onClick={(e) => handleParentClick(e, index)}
                                                        >
                                                            <span className="d-flex align-items-center">
                                                                <span className="menu-icon">{i.icon}</span>
                                                                <span className="menu-title">{i.label}</span>
                                                            </span>

                                                            <span className={`submenu-indicator ${openIndex === index ? 'open' : ''}`}>
                                                                <IoChevronDownSharp style={{ width: '34.78px', height: '20.34px' }} />
                                                            </span>
                                                        </NavLink>

                                                        <ul id={`submenu-${index}`} className={`collapse ${openIndex === index ? 'show' : ''}`}>
                                                            {i.children.map((child, childIndex) => (
                                                                <li key={childIndex} className="menu-subitem">
                                                                    <NavLink
                                                                        to={child.route}
                                                                        className="d-flex align-items-center"
                                                                        onClick={handleSidebarDismiss}
                                                                    >
                                                                        <span className="menu-title">{child.label}</span>
                                                                    </NavLink>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <NavLink
                                                        to={i.route}
                                                        className={`d-flex align-items-center`}
                                                        onClick={handleSidebarDismiss}
                                                    >
                                                        <span className="menu-icon">
                                                            {i.icon}
                                                        </span>
                                                        <span className="menu-title">
                                                            {i.label}
                                                        </span>
                                                    </NavLink>
                                                )
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}