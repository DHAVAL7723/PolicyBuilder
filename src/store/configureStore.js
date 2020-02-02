import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {authentication} from '../reducers/authentication.reducer'
import users from "../reducers/userReducer";
import {registration} from "../reducers/registration.reducer";
import { routerReducer } from 'react-router-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
const store = createStore(
    combineReducers({
        users,
        authentication,
        registration,
        routing: routerReducer
    }),
    {},
    applyMiddleware(thunk, logger)
);
export default store;

export const history = syncHistoryWithStore(browserHistory, store);