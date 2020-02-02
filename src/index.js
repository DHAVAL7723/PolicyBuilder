import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter,  Router, Switch } from 'react-router-dom';
//import App from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { Route, Switch } from 'react-router-dom';
import './asserts/css/modern-business.css'
import store, {history} from './store/configureStore';

/*ReactDom.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById("root")
);*/
import App from './components/App';
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
