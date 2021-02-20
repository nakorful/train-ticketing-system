import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Reservation from "../../pages/Reservation";

export const defaultErrorHandler = (error) => {
  if (!!error.response && (error.response.status === 403 || error.response.status === 401)) {
    window.location.pathname = '/signin';
  }
}

const AuthRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.user);
  return (
    <Route {...rest} render={(props) => (
     user && Object.keys(user).length === 0
        ? <Redirect to={'/signin'} />
        : <Reservation  {...props} />
    )} />
  )
}

export default AuthRoute;