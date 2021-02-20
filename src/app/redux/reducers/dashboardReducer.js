import store from "../store";
import actionTypes from "../actions/actionTypes";


export default (state = store, {type, payload}) => {
    switch (type){
        case actionTypes.DISPATCH_TICKET_DETAILS:
            return {
                ...state,
                ticket_details: payload
            }
        case actionTypes.DISPATCH_PASSENGER_DETAILS:
            return {
                ...state,
                passenger_details: payload
            }
        default:
            return state;
    }
}