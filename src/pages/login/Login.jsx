import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { loaders } from '../../components/loader/Loader';

import password from '../../assets/images/password.svg'
import email from '../../assets/images/email.svg'
import password_hide from '../../assets/images/password_hide.svg'
import password_show from '../../assets/images/password_show.svg'

import './Login.css'

import login_logo from '../../assets/images/login-logo.svg';

import { useDispatch, useSelector } from 'react-redux';
import { reqtoSuperAdminLogin } from '../redux-Toolkit/services/superadmin/AuthServices';

const initialState = {
    email: "",
    password: "",
}

const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [showpassword, setshowpassword] = useState(false);
    const { loader } = useSelector((state) => state.SuperAdminAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("eyeman-superAdmin-token");

    useEffect(() => {
        if (token) {
            navigate("/superadmin/dashboard");
        }
    }, [token]);

    const PasswordShowHide = () => {
        setshowpassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await dispatch(reqtoSuperAdminLogin(formData));

            if (res.payload?.success) {
                navigate("/superadmin/dashboard");
                setFormData(initialState);
            }

        } catch (err) {
            throw err;
        }
    }
    return (
        <>
            <section className="login-section">
                <div className="container d-flex align-items-center justify-content-center min-vh-100">
                    <div className="bg-white login-box">
                        <div className="left-box align-items-center justify-content-center d-flex">
                            <div className="align-items-center w-100">
                                <div className="header-text d-flex flex-column align-items-center">
                                    <img src={login_logo} className="login-logo" draggable="false" />
                                    <div className='d-flex flex-column align-items-center'>
                                        <h4 className="">Super Admin <span>Sign In</span>

                                            <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} />

                                        </h4>
                                        <p>Hello there, sign in to continue super admin account!</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="input-with-icon">
                                        <span className="input-icon"><img src={email} alt="" /></span>
                                        {/* <label htmlFor="email" className="form-label">Email:</label> */}
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Your Email Address"
                                            // autoComplete='off'
                                            value={formData?.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="password-field input-with-icon">
                                        <span className="input-icon"><img src={password} alt="" /></span>
                                        {/* <label htmlFor="password" className="form-label">Password:</label> */}
                                        {/* <div className=""> */}
                                        <input
                                            type={showpassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Enter Your Password"
                                            // autoComplete='off'
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span
                                            onClick={PasswordShowHide}
                                            style={{
                                                position: 'absolute',
                                                right: '20px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                border: "0",
                                                color: '#000',
                                                backgroundColor: "transparent",
                                                cursor: 'pointer',
                                                zIndex: "999"
                                            }}
                                        >
                                            {showpassword ? <img src={password_show} alt="password_show" /> : <img src={password_hide} alt="password_hide" />}
                                        </span>
                                        {/* </div> */}
                                    </div>
                                    <div className="">
                                        <button
                                            className={`login-btn ${loader ? 'btn-loading' : ''}`}
                                            disabled={loader}
                                        >
                                            {loader && loaders.small}
                                            {loader ? 'Continue...' : 'Continue'}
                                        </button>
                                        {/* <button className='login-btn'>
                                            Sign In
                                        </button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <div className="col-lg-6 right-box">
                            <div className="glass-effect d-flex justify-content-center align-items-center">
                                <img src={logo} className="login-logo" draggable="false" />
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login