import actionTypes from "../actionTypes";


export const logoutUser = () => ({
    type: actionTypes.LOGOUT_USER
});

export const dispatchTicketDetails = (ticketDetails) => ({
    type: actionTypes.DISPATCH_TICKET_DETAILS,
    payload: ticketDetails
})

export const dispatchPassengerDetails = (details) => ({
    type: actionTypes.DISPATCH_PASSENGER_DETAILS,
    payload: details
})