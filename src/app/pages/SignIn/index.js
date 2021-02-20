import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import train_logo from "../../assets/images/80px-AIGA_rail.svg.png";
import train_background from '../../assets/images/train_background.jpg'
import SERVICES from "../../services";
import {dispatchUser} from "../../redux/actions/auth";
import './styles.css'

const SignIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    // ========== FIELDS ========== \\
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // ========== FORM VALIDATION ========== \\
    const requiredFields = [email, password];
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [signingIn, setSigningIn] = useState(false);

    // ========== SUBMISSION ERRORS ========== \\
    const [networkError, setNetworkError] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    // ========== SUBMIT FORM ========== \\
    const handleSubmit = (e) => {
        e.preventDefault();
        setSigningIn(true);
        setShowValidationErrors(true);

        // ::::: Validate Form :::::\\
        // Empty Field
        if (!requiredFields.every(Boolean)) {
            setSigningIn(false);
            return;
        }


        // ::::: Login User :::::\\
        SERVICES.attemptLogin({email, password}).then(({data}) => {
            console.log(data)

            SERVICES.saveToken(data.accessToken)

            dispatch(dispatchUser(data));

            history.push('/');
        }).catch((error) => {
            switch (error.code) {
                case "401":
                    setInvalidCredentials(true);
                    break;
                default:
                    setNetworkError(true);
                    console.log(error);
            }
        }).finally(() => {
            setSigningIn(false);
        })

    }


    return (
        // <ManageGroups />
        <div className='content-holder'>
            <div>
                <img className='logo' src={train_logo} alt="" />
                <p className='title'>
                    Online Train Ticket Reservation
                </p>
            </div>
            <div style={{ backgroundImage: `url(${train_background})` }}>
                <form onSubmit={handleSubmit}>
                    {/*<h4>Account Login</h4>*/}
                    <div className="fields">
                        {/* ::::: Email ::::: */}
                        <div className="form-group">
                            <input type="email" className='form-control' placeholder="Email Address" autoComplete="email" style={{fontSize: '16px'}}
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        {/* ::::: Password ::::: */}
                        <div className="form-group">
                            <input type="password" className='form-control' placeholder="Password" style={{fontSize: '16px'}}
                                autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        {/* ::::: Remember Me, Forgot Password ::::: */}
                        <div id="misc">
                            <label htmlFor="remember-me">
                                <input type="checkbox" name="remember-me" readOnly={true}
                                    checked={rememberMe} onClick={() => setRememberMe(!rememberMe)}
                                />
                                <span className='remember' style={{color: 'white'}}>Remember Me</span>
                            </label>
                        </div>
                        {/* ::::: Submit ::::: */}
                        <button className="submit btn btn-primary"
                            disabled={(!requiredFields.every(Boolean)) || (password.length < 4 || email.length < 4) || signingIn}
                        >
                            Log In
                        </button>
                    </div>
                    <div className='create-account'><span style={{color: 'white'}}>Don't have an account?</span> <Link className="link" to={"/signup"}>Create Account</Link></div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
