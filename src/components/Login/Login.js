import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {checkUserLogin} from "../../actions/userActions";
class Login extends Component {
    constructor(props) {
        super(props);
        // reset login status
        //this.props.dispatch(logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            //dispatch(login(username, password));
            checkUserLogin(username, password).then(response => {
                const data = response;
                if(data.status === 'ERROR') {

                } else {
                    this.props.history.push('/profile');
                }
            })


        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
            <div className="col-md-6 col-md-offset-3">
            <h2>Login</h2>
            <form name="form" onSubmit={this.handleSubmit}>
            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
        {submitted && !username &&
        <div className="help-block">Username is required</div>
        }
    </div>
        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
        {submitted && !password &&
        <div className="help-block">Password is required</div>
        }
    </div>
        <div className="form-group">
            <button className="btn btn-primary">Login</button>
        {loggingIn &&
        <img src="" />
        }
    <Link to="/register" className="btn btn-link">Register</Link>
            </div>
            </form>
            </div>
        </div>
    );
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

//const connectedLoginPage = connect(mapStateToProps)(Login);
//export { connectedLoginPage as Login };
export default connect(mapStateToProps)(Login);