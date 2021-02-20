import { combineReducers } from 'redux';
import AUTH from "./authReducer"
import DASHBOARD_REDUCER from "./dashboardReducer"


export default combineReducers({
  auth:AUTH,
  dashboard:DASHBOARD_REDUCER
});
