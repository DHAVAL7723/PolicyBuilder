import {combineReducers} from 'redux';
import {registration} from "./registration.reducer";
import users from "./userReducer";
const rootReducer= combineReducers({
    users,
    registration
});

export default rootReducer;