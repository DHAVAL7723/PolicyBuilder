import {userConstants} from "../_constants/user.constants";
import {checkUserLogin, log_out, createUser} from "./userActions";
//import { Link } from 'react-router-dom';
import {browserHistory} from 'react-router';
import {Route, Redirect} from 'react-router-dom';
import React from "react";
import axios from "axios";

export function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

       var result = checkUserLogin({email: username, password: password})
       .then(
                user => {
                    // login successful if there's object the response
                    if (user[0] !== undefined) {
                        console.log( ' user :', JSON.stringify(user[0]));
                        // store user details in local storage
                        localStorage.setItem('user', JSON.stringify(user));
                        dispatch(success(user));
                        if(user[0].Email == 'admin@admin.com'){
                            console.log('admin::', user[0].Email);
                            browserHistory.push('/adminview/' + user[0]._id);
                        }else {
                           // console.log('not admin:', user[0].Email);
                            //browserHistory.push('/profile');
                            return response.json();
                        }
                    }
                    else{
                        dispatch(failure('User not found'));
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
export function logout() {
    log_out();
    return { type: userConstants.LOGOUT };
}

export function register(user) {
    let config = {'api-key': 'RReio98$3#hsdhfDFSe31&sE4e5665DGs'};
    return axios.post('http://localhost:8098/createNewUser', {
        "Name": user.name,
        "Email": user.email,
        "password": user.password,
        "status": 'Active',
    }, {
        headers: {
            'api-key': 'RReio98$3#hsdhfDFSe31&sE4e5665DGs',
        }
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return(error);
        });




    /*return dispatch => {
        dispatch(request(user))
        console.log('user register ...', user);
       var result =  createUser(user)
           .then(
           response => {
               console.log(response);
               if (response.status == 200) {
                   console.log( ' user name:', response.data.name);
                   dispatch(success(response.data));
                   return response;
                  // browserHistory.push('/login');//tripview/'+response.data._id);
               }
               else{
                   dispatch(failure('registration failed'));
               }
           },
           error => {
               dispatch(failure(error));
               // dispatch(alertActions.error(error));
           }
       );
    };*/

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}