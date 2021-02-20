import actionTypes from "../actions/actionTypes";
import store from "../store"


export default (state = store, {type, payload}) => {
    switch (type){
        case actionTypes.DISPATCH_USER:
            return{
                ...state,
                user: payload
            }

        default:
            return state;
    }
}