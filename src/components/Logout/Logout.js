import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {login, logout} from "../../actions/loginAction";
class Logout extends Component {

    componentWillMount() {
        this.props.dispatch(logout());
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }

}

export default connect()(Logout);