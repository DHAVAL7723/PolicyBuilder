import moment from 'moment-timezone';


const tz = moment.tz.guess();


export function headers(){
    const myHeaders = new Headers();
    myHeaders.append('api-key','RReio98$3#hsdhfDFSe31&sE4e5665DGs');

    /**
     * This corresponds to using follower ID of 5. If this follower is not in the DB, a 403 will return.
     */
    myHeaders.append('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb2xsb3dlcl9pZCI6NSwiZGF0ZXRpbWUiOiIyMDE4LTA2LTA2IDE3OjU5OjEyLjgwNDcyMSJ9.Mbe1e4CeSOJoykMoMPbJtezlSH2B-zi-xQUphR4yDCg');
    return myHeaders;
}

/**
 * For localhost debugging:
 *
 * Set these environment variables in elastic beanstalk (they override what is set here):
 *   REACT_APP_API_SCHEME (the URL scheme to the main Django app. e.g. "http")
 *   REACT_APP_API_HOST_PORT (where the gameday main Django app is. e.g. "localhost:8000")
 *
 *  Note: we want to use http in a local env... this is overridden by env variables above, which are set in elastic
 *        beanstalk config... to use https by default
 */

const API_SCHEME = process.env.REACT_APP_API_SCHEME || 'http';
// const API_HOST_PORT = process.env.REACT_APP_API_HOST_PORT || 'api.gmdy.co';
const API_HOST_PORT = process.env.REACT_APP_API_HOST_PORT || 'localhost:8098';
// const API_HOST_PORT = process.env.REACT_APP_API_HOST_PORT || 'gmdy-prod.us-west-2.elasticbeanstalk.com';

const BASEURL = `${API_SCHEME}://${API_HOST_PORT}/`;

/**
 * Takes a URL and replaces its scheme (e.g. http/https) component with the API_SCHEME above. This is
 * to get around an odd behavior from the API server that currently returns "next" URLs with "http"
 * even if we're calling the API using "https"
 *
 * @param {*} url the URL to apply the API scheme to
 *
 * @returns the URL with the API scheme applied
 */
export function applyApiScheme(url) {
    let newUrl = url;

    if (url) {
        const schemeEndIndex = url.indexOf(':');

        if (schemeEndIndex > 0) {
            newUrl = `${API_SCHEME}${url.slice(schemeEndIndex)}`;
        }
    }
    return newUrl;
}

export function baseURL(){
    return BASEURL;
}

export function handleErrors(response) {
    if (!response.ok) {
        // console.log("ERROR");
        // throw Error(response.statusText);
        // return null;
    }
    return response;
}

/**
 * Creates a filtering predicate for an event (as provided by the API) whose start date matches
 * the date, month, and year of a particular date. Dates from the API are always in UTC.
 *
 * @param {*} date the date to create the predicate for (date should use default timezone)
 */
export const filterEventForDate = (date) => (event) => {
    const eventStartDate = moment(event.start_datetime).tz(tz);

    return ( (date.getFullYear() === eventStartDate.year()) &&
        (date.getMonth() === eventStartDate.month()) &&
        (date.getDate() === eventStartDate.date()) );
};

