import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createUser} from "../../actions/userActions";
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: ''
            },
            submitted: false,
            errorStatus: false,
            errorMsg : null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.name && user.email && user.password) {
            createUser(user).then(response => {
                  const data = response.data;
                  if(data.status === 'ERROR') {
                      this.state.errorMsg = data.payload;
                      this.setState({errorStatus: true});
                  } else {
                      this.props.history.push('/login');
                  }
            })


        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted,errorStatus,errorMsg } = this.state;
        let errorDisplay;
        if(errorStatus) {
            errorDisplay =  <h4>{errorMsg}</h4>;
        }
        return (
            <div>
            <div className="col-md-6 col-md-offset-3">
            <h2>Register</h2>
            <form name="form" onSubmit={this.handleSubmit}>
            <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
            <label htmlFor="name"> Name</label>
            <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
        {submitted && !user.name &&
        <div className="help-block"> Name is required</div>
        }
    </div>
        <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
            <label htmlFor="email">email</label>
            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
        {submitted && !user.email &&
        <div className="help-block">email is required</div>
        }
    </div>
        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
        {submitted && !user.password &&
        <div className="help-block">Password is required</div>
        }
    </div>
        <div className="form-group">
            <button className="btn btn-primary">Register</button>
        {registering &&
        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
    <Link to="/" className="btn btn-link">Cancel</Link>
            </div>
            </form>
                {errorDisplay}
            </div>
        </div>
    );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

//const connectedRegisterPage = connect(mapStateToProps)(Register);
//export { connectedRegisterPage as Register };
export default connect(mapStateToProps)(Register);