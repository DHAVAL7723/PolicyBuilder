import React from 'react'
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import { Route, Switch } from 'react-router-dom';
import Home from "./Home/Home";
import Blog from "./Blog/Blog";
import AboutUs from "./AboutUs/AboutUs";
import Login from "./Login/Login";
import Register from "./Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Profile from "./Profile/Profile";
import Admin from "./Admin/Admin";
import Logout from './Logout/Logout';
import Policies from './Policies/Policies';
import PolicyFields from './Admin/PolicyFields'
class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/blog' component={Blog} />
                <Route exact path='/aboutus' component={AboutUs} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/logout' component={Logout} />
                <Route exact path='/policies' component={Policies} />
                <PrivateRoute exact path='/profile' component={Profile} />
                <PrivateRoute exact path='/admin' component={Admin} />
                <PrivateRoute exact path='/policyfield' component={PolicyFields} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}
export default App;