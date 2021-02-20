import React, {useEffect} from "react";
import './styles.css';
import {useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';

function Receipt({currentStep, values}) {
    const user = useSelector(state => state.auth.user);
    const details = useSelector(state => state.dashboard.ticket_details);
    const passenger = useSelector(state => state.dashboard.passenger_details);

    const age = passenger.age;
    const mobile = user.mobile;
    const passengerName = passenger.passengerName;
    const gender = passenger.gender;
    const trainName = details.trainName;
    const from = details.from;
    const to = details.to;
    const trainClass = details.trainClass;
    const date = details.date;
    const email = passenger.email;

    const $array = date ? date.split(" ") : Date();
    const ticketCode = uuidv4();

    const $code_array = ticketCode.split("-");

    const first3 = [$code_array[0], $code_array[1], $code_array[2]].join("-");

    let formatDate = '';

    if (date) {
        const datePart = [$array[0], $array[1], $array[2], $array[3]].join(" ");

        const arryaTimePart = $array[$array.length - 2].split(":");

        const timePart = [arryaTimePart[0], arryaTimePart[1]].join(":");

        formatDate = datePart.concat(` ( ${timePart} )`);
    } else
        formatDate = "N/A";

    return (
        (currentStep === 3) &&
        <div className='receipt-holder' style={{display: 'flex', alignItems: 'center', flexDirection:'column'}}>
            <div>
                Ticket Booking Details {values.trainClass}
            </div>
            <div>
                <div>
                    Ticket Code: {first3}
                </div>
                <div>
                    Name: { passengerName }
                </div>
                <div>
                    Age: {age}
                </div>
                <div>
                    Gender: { gender }
                </div>
                <div>
                    Mobile: { mobile }
                </div>
                <div>
                    Email: { email }
                </div>
                <div>
                    Train Name: { trainName }
                </div>
                <div>
                    From: { from }
                </div>
                <div>
                    To: { to }
                </div>
                <div>
                    Train Class: { trainClass }
                </div>
                <div>
                    Departure Date: { formatDate }
                </div>
            </div>
        </div>
    )
}

export default Receipt