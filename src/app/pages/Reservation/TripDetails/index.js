import React, {useCallback, useEffect, useState} from "react";
import DateTimePicker from 'react-datetime-picker';
import {useDispatch} from "react-redux";
import { dispatchTicketDetails } from "../../../redux/actions/dashboard";

function TripDetails({ currentStep }) {
    const [trainName, setTrainName] = useState('S117 Railcar DMU');
    const [from, setFrom] = useState('Tema');
    const [to, setTo] = useState('Accra');
    const [trainClass, setTrainClass] = useState(1);
    const [date, onDateChange] = useState();

    const dispatch = useDispatch();

    const handleTrainNameChange = useCallback((e) => {
        setTrainName(e.target.value);
    }, []);

    const handleFromChange = useCallback((e) => {
        setFrom(e.target.value);
    }, []);

    const handleToChange = useCallback((e) => {
        setTo(e.target.value);
    }, []);

    const handleClassChange = useCallback((e) => {
        setTrainClass(e.target.value);
    }, []);

    useEffect(() => {
        return function cleanup() {
            console.log("Doing cleanup inside TripDetails ....");
            dispatch(dispatchTicketDetails({
                trainName,
                from,
                to,
                trainClass,
                date: (date) ? date.toUTCString() : ""
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

    return (
        (currentStep === 1) &&
        <div className="form-group">
            <label htmlFor="">Train Name</label>
            <select className="form-control form-control-sm" disabled onChange={handleTrainNameChange} value={trainName}>
                <option>S117 Railcar DMU</option>
            </select>
            <label htmlFor="">Journey From</label>
            <select className="form-control form-control-sm" onChange={handleFromChange} value={from}>
                <option>Tema</option>
                <option>Accra</option>
            </select>
            <label htmlFor="">Journey To</label>
            <select className="form-control form-control-sm" onChange={handleToChange} value={to}>
                <option>Accra</option>
                <option>Tema</option>
            </select>
            <label htmlFor="">Train Class</label>
            <select className="form-control form-control-sm" onChange={handleClassChange} value={trainClass}>
                <option>1</option>
                <option>2</option>
            </select>
            <label htmlFor="">Departure Date</label>
            <div className="datetime-picker">
                <DateTimePicker
                    onChange={onDateChange}
                    value={date}
                />
            </div>
        </div>
    )
}

export default TripDetails;