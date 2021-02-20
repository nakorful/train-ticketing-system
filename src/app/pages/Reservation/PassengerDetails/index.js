import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dispatchPassengerDetails, dispatchTicketDetails} from "../../../redux/actions/dashboard";

function PassengerDetails({ currentStep }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const username = user.username.split(" ");
    const mobile = user.mobile;
    const registeredEmail = user.email;

    const first_name = username[0];
    const last_name = username[1];

    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);

    const index = mobile.indexOf('0');
    const formattedMobile = mobile.slice(index + 1);

    const [age, setAge] = useState();
    const [gender, setGender] = useState('Male');
    const [email, setEmail] = useState(registeredEmail);

    useEffect(() => {
        return function cleanup() {
            console.log("Doing cleanup inside PassengerDetails ....");
            dispatch(dispatchPassengerDetails({
                        passengerName: `${firstName} ${lastName}`,
                        age,
                        email,
                        gender
                    }))
            // setValues({
            //     trainName,
            //     from,
            //     to,
            //     trainClass,
            //     date: date.toUTCString()
            // });
        }
        // dispatch(dispatchTicketDetails({
        //     trainName,
        //     from,
        //     to,
        //     trainClass,
        //     date: date.toUTCString()
        // }))
    });

    // useEffect(() => {
    //
    //     dispatch(dispatchPassengerDetails({
    //         passengerName: `${first_name} ${last_name}`,
    //         age,
    //         gender
    //     }))
    // }, []);

    const handleAgeChange = useCallback((e) => {
        setAge(e.target.value);
    }, []);

    const handleGenderChange = useCallback((e) => {
        setGender(e.target.value);
    }, []);

    const handleFirstNameChange = useCallback((e) => {
        setFirstName(e.target.value);
    }, []);

    const handleLastNameChange = useCallback((e) => {
        setLastName(e.target.value);
    }, []);

    const handleEmailChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    return (
        (currentStep === 2) &&
        <div className="form-group">
            <label htmlFor="">Name of Passenger</label>
            <div className="form-row">
                <div className="col">
                    <input type="text" className="form-control form-control-sm" name="first_name" placeholder="First name" onChange={handleFirstNameChange} value={firstName}/>
                </div>
                <div className="col">
                    <input type="text" className="form-control form-control-sm" name="last_name" placeholder="Last name" onChange={handleLastNameChange} value={lastName} />
                </div>
            </div>
            <label htmlFor="age">Age of Passenger</label>
            <input
                className="form-control form-control-sm"
                id="age"
                name="age"
                onChange={handleAgeChange}
                value={age}
                type="text"/>
            <label htmlFor="gender">Gender</label>
            <div className="custom-control custom-radio" style={{marginTop: '-21px'}}>
                <input type="radio" id="male" name="gender" className="custom-control-input" onChange={handleGenderChange} value='Male' checked={gender === 'Male'}/>
                    <label className="custom-control-label" htmlFor="male">Male</label>
            </div>
            <div className="custom-control custom-radio" style={{marginTop: '-13px'}}>
                <input type="radio" id="female" name="gender" className="custom-control-input" onChange={handleGenderChange} value='Female' checked={gender === 'Female'} />
                    <label className="custom-control-label" htmlFor="female">Female</label>
            </div>
            <div className="custom-control custom-radio" style={{marginTop: '-13px'}}>
                <input type="radio" id="other" name="gender" className="custom-control-input" onChange={handleGenderChange} value='Other' checked={gender === 'Other'}/>
                <label className="custom-control-label" htmlFor="other">Other</label>
            </div>
            <label htmlFor="gender">Mobile Number</label>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="tel">+233</span>
                </div>
                <input type={"tel"} className="form-control form-control-sm" disabled aria-label="mobile"
                       aria-describedby="tel" value={formattedMobile} />
            </div>
            <label htmlFor="email" style={{marginTop: '-23px'}}>Email Address</label>
            <input
                className="form-control form-control-sm"
                style={{width: '100% !important'}}
                id="email"
                name="email"
                type="text"
                onChange={handleEmailChange}
                value={email}
            />
        </div>
    )
}

export default PassengerDetails