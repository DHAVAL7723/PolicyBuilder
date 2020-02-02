import axios from 'axios';
import {userConstants} from "../_constants";
import {headers,baseURL,handleErrors} from '../util/helpers.js'
const myHeaders = headers();
const url = baseURL();
export function tripsList(trips) {
    return { type: 'TRIP_LIST', trips}
}
export function userList(users) {
    return { type: 'USER_LIST', users}
}

export function createUser(user) {
    return axios.post(url+"createNewUser", {
        "Name": user.name,
        "Email": user.email,
        "password": user.password,
        "status" : 'Active'
    }, {
        headers: myHeaders
    })
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            return(error);
        });
}

export function getTripListById(id) {
    const request = axios({
        method: 'GET',
        url: url+'getTripsListById/'+id,
        headers: myHeaders,
    });
    return (dispatch) => {
        request.then((trips) =>{
            dispatch(tripsList(trips.data));
        })
    }
}
export function getTripList() {
    const request = axios({
        method: 'GET',
        url: url+'getTripsList',
        headers: myHeaders,
    });
    return (dispatch) => {
        request.then((trips) =>{
            console.log('trips.data : ', trips.data);
            dispatch(tripsList(trips.data.results));
        })
    }
}
export function getUserList() {
    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    return fetch(url+'getUsersList', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.payload));
            //dispatch(user.payload);
            return user;
        });
}

export function updateTrip(trip) {
    let config = {'api-key': 'RReio98$3#hsdhfDFSe31&sE4e5665DGs'};
    const request = axios({
        method: 'POST',
        url: 'http://localhost:8098/updateTripInfo',
        headers: config,
        data: trip
    });
    return (dispatch) => {
        request.then(({data}) =>{
            alert("Trip updated successfully")
        })
    }
}
export function deletedTrip(tripId) {
    return { type: 'DELETE_TRIP', tripId}
}

export function deleteTrip(tripId) {
    let config = {'api-key': 'RReio98$3#hsdhfDFSe31&sE4e5665DGs'};
    const request = axios({
        method: 'POST',
        url: 'http://localhost:8098/removeTrip/'+tripId,
        headers: config,
    });
    return (dispatch) => {
        request.then(({data}) =>{
            dispatch(deletedTrip(tripId));
        })
    }
}

export function checkUserLogin(username,password) {
    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    return fetch(url+'checkUserLogin/'+username+'/'+password, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.payload));
            //dispatch(user.payload);
            return user;
        });
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}
export function log_out() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
export function createField(fields) {
    let config = {'api-key': 'RReio98$3#hsdhfDFSe31&sE4e5665DGs'};
    const data = {
        "key": fields.value,
        "label": fields.value,
        "type": fields.type,
        "categoryType": fields.field,
        "inputTag" : fields.inputTag
    }
    return axios.post(url+'createNewField', data, {
        headers: myHeaders
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return(error);
        });

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

export function getAdminFieldsList() {
    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    return fetch(url+'getAdminFieldsList', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(fieldsList => {
            return fieldsList;
        });
}