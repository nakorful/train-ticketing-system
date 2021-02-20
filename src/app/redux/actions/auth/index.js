import actionTypes from '../actionTypes';

const dispatchUser = (user) => dispatch => {
    console.log("dispatching user", user)
    dispatch({
        type:actionTypes.DISPATCH_USER,
        payload:user
    })
}

export const user = (user) => dispatch => {
    dispatch({
        type: actionTypes.LOGIN_USER,
        payload:user
    })
};


export  {
    dispatchUser
}