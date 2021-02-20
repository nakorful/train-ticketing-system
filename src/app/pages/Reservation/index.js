import React, { useState } from "react";
import train_background from '../../assets/images/train_background.jpg';
import black_n_white from '../../assets/images/black-n-white.jpg';
import TripDetails from "./TripDetails";
import PassengerDetails from "./PassengerDetails";
import ContactDetails from "./ContactDetails";
import './styles.css'
import Receipt from "./Receipt";
import { dispatchTicketDetails } from "../../redux/actions/dashboard";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

function Reservation(props) {
    const [currentStep, setCurrentStep] = useState(1);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = useState({});
    const [val, setVals] = useState({});

    const dispatch = useDispatch();

    function _next(details) {
        // const { trip } = details;
        //
        // dispatch(dispatchTicketDetails(trip));

        let current = currentStep;
        // If the current step is 1 or 2, then add one on "next" button click
        current = current >= 2 ? 3 : (current + 1);

        setCurrentStep(current);
    }

    function _prev() {
        let current = currentStep;
        // If the current step is 2 or 3, then subtract one on the "previous" button click
        current = current <= 1 ? 1 : (current - 1);
        setCurrentStep(current);
    }

    function previousButton() {
        let current = currentStep;

        if (current === 3) {
            return (
                <button className="btn btn-success got-it float-right"
                        style={{outline: 'none'}}
                        type="button"
                        onClick={_prev}>
                    <Link className="link" to={"/"}>Got It!</Link>
                </button>
            )
        }
        // If the current step is not 1, then render the "previous" button
        if (current !== 1 || current < 3) {
            return (
                <button className="btn previous"
                        style={{background:'white', outline: 'none'}}
                        type="button"
                        onClick={_prev}>
                    Previous
                </button>
            )
        }
        return null;
    }

    function nextButton() {
        let current = currentStep;
        // If the current step is not 3, then render the "next" button
        if (current < 3) {
            return (
                <button className="btn float-right next"
                        style={{background:'#282c34', border: 'none', outline: 'none'}}
                        type="button"
                        onClick={_next}>
                    Next
                </button>
            )
        }
        return null;
    };

    return (
        <div style={{backgroundImage: `url(${train_background})`, backgroundSize: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div className='form-holder' style={{background: (currentStep === 3) && `url(${black_n_white})`, backgroundSize: (currentStep === 3) && '100vw 100vh'}}>
                <form>
                    {/*Render the form steps and pass in the required props*/}
                    <TripDetails
                        currentStep={currentStep}
                        email={email}
                    />
                    <PassengerDetails
                        currentStep={currentStep}
                        username={username}
                    />
                    <Receipt
                        currentStep={currentStep}
                        password={password}
                        values={values}
                    />
                    {previousButton()}
                    {nextButton()}
                </form>
            </div>
        </div>
    )
}

export default Reservation