import React, {useCallback, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import train_logo from "../../assets/images/80px-AIGA_rail.svg.png";
import SERVICES from "../../services";
import {useDispatch} from "react-redux";
import train_background from "../../assets/images/train_background.jpg";


const SignUp = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const password_regex = new RegExp("((?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%!]).{8,40})");
    const password_one_digit = new RegExp(".*\\d+.*");
    const password_one_lowercase = new RegExp(".*[a-z].*");
    const password_one_uppercase = new RegExp(".*[A-Z].*");
    const password_symbol_regex = new RegExp(".*[@#$%!].*");

    // ========== FIELDS ========== \\
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [mobile, setMobile] = useState("");

    // ========== FORM VALIDATION ========== \\
    const requiredFields = [firstName, lastName, email, password, retypePassword, mobile];
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = useCallback((e) => {
        setPassword(e);

        if (password_regex.test(e)) {
            setPasswordValidationMessage("");
        }
        if (!password_symbol_regex.test(e)) {
            setPasswordValidationMessage("Password must contain at least one of these characters (@#$%!)");
        }

        if (e.length < 8 || e.length > 40) {
            setPasswordValidationMessage("Password length must be between 8 and 40 characters")
        }
        if (!password_one_digit.test(e)) {
            setPasswordValidationMessage("Password must contain at least one digit");
        }
        if (!password_one_lowercase.test(e)) {
            setPasswordValidationMessage("Password must contain at least one lowercase");
        }
        if (!password_one_uppercase.test(e)) {
            setPasswordValidationMessage("Password must contain at least one uppercase");
        }

    }, []);

    // ========== SUBMISSION ERRORS ========== \\
    const [networkError, setNetworkError] = useState(false);
    const [existingUserError, setExistingUserError] = useState(false);


    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = e => {
        setButtonClicked(true);
    };


    // ========== SUBMIT FORM ========== \\
    const handleSubmit = (e) => {
        console.log(password.length);
        e.preventDefault();
        setSigningUp(true);
        setShowValidationErrors(true);

        // ::::: Validate Form :::::\\
        // Empty Field Or Unmatching Passwords
        if (!requiredFields.every(Boolean) || password !== retypePassword) {
            setSigningUp(false);
            return;
        }

        // ::::: Create User ::::: \\
        const user = { firstName, lastName, email, password, retypePassword, mobile }

        SERVICES.register(user).then((response) => {
            history.push("/signin");
            console.log(response);
        }).catch(({response:{status, data: {message}}}) => {
            console.log("error is", message);

            console.log('The status code', status);

            switch (status) {
                case '200':
                case '400':
                case '500':
                    setErrorMessage(message);
                    break;
                case "401":
                    setExistingUserError(true);
                    break;
                default:
                    setNetworkError(true);
                    console.log(message);
            }
        }).finally(() => {
            setSigningUp(false);
        })
    }

    return (
        <div className="content-holder">
            <div>
                <img className='logo' src={train_logo} alt="" />
                <p className='title'>
                    Online Train Ticket Reservation
                </p>
            </div>
            <div style={{ backgroundImage: `url(${train_background})` }}>
                {/* ========== FORM ========== */}
                <form onSubmit={handleSubmit}>
                    <h4>Create a New Account</h4>
                    {/* ::::: Third-Party SignUp ::::: */}
                    <div className="fields">
                        {/* ::::: First Name ::::: */}
                        <div className="form-group">
                            <input type="text" className='form-control' placeholder="First Name" style={{fontSize: '16px'}}
                                value={firstName} onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        {/* ::::: Last Name ::::: */}
                        <div className="form-group">
                            <input type="text" className='form-control' placeholder="Last Name" style={{fontSize: '16px'}}
                                   value={lastName} onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                        {/* ::::: Email ::::: */}
                        <div className="form-group">
                            <input type="email" className='form-control' placeholder="Email Address" autoComplete="email" style={{fontSize: '16px'}}
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        {/* ::::: Password ::::: */}
                        <div className="form-group">
                            <input type="password" className='form-control' placeholder="Password" style={{fontSize: '16px'}}
                                autoComplete="current-password" value={password} onChange={e => validatePassword(e.target.value)}
                            />

                        </div>
                        {/* ::::: Confirm Password ::::: */}
                        <div className="form-group">
                            <input type="password" className='form-control' placeholder="Confirm Password" style={{fontSize: '16px'}}
                                autoComplete="current-password" value={retypePassword} onChange={e => setRetypePassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text" className='form-control' placeholder="Mobile Number" style={{fontSize: '16px'}}
                                   value={mobile} onChange={e => setMobile(e.target.value)}
                            />
                        </div>
                        {/* ::::: Submit ::::: */}
                        <button className="submit btn btn-primary" style={{width: '160px', marginBottom: '20px', marginTop: '10px'}}
                            disabled={(!requiredFields.every(Boolean)) || (password.length < 4 || email.length < 4) || signingUp}
                        >
                            Create Account
                        </button>
                    </div>
                    <div><span style={{color: 'white'}}>Already have an account?</span> <Link className="link" to={'signin'}><span style={{color: 'black'}}>Sign In</span></Link></div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;