import React, { Component } from "react";
//import {Route, IndexRoute} from 'react-router';
import './styles/App.css';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import AboutUs from './components/AboutUs/AboutUs';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Admin from './components/Admin/Admin';
import Logout from './components/Logout/Logout';
import Policies from './components/Policies/Policies';
import App from './components/App'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export default (
    <BrowserRouter path="/" component= {App}>
    <Switch>
        <IndexRoute  component={Home}/>
        <Route exact path='/blog' component={Blog} />
        <Route exact path='/aboutus' component={AboutUs} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/admin' component={Admin} />
        <Route exact path='/logout' components={Logout} />
        <Route exact path='/policies' components={Policies} />
     </Switch>
    </BrowserRouter>
);
