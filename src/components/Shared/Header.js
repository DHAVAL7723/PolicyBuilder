import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {login, logout} from "../../actions/loginAction";
import './Style.scss';
class Header extends Component {

    render() {
        const{module, onChangeNavigation}= this.props;
        const getClassName = (currentClass) => {
            return (module === currentClass) ? "nav-item active" : "nav-item";
        };
        const user = localStorage.getItem('user');
        return(
            
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
            <Link to="/" className="btn btn-link">P & P Genius</Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <Link to="/"  className="btn btn-link">Home</Link>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href='' id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           About Us
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
            <Link to="/" className="btn btn-link">Mission</Link>
            <Link to="/" className="btn btn-link">Our Team</Link>
            <Link to="/" className="btn btn-link">Contact Us</Link>
        </div>
        </li>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Blog
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
            <Link to="/blog" className="btn btn-link">Blog Post</Link>
        </div>
        </li>
         {!user &&
           <li className="nav-item">
               <Link to="/login" className="btn btn-link">Login</Link>
           </li>
         }
         {!user &&
          <li className="nav-item">
              <Link to="/register" className="btn btn-link">Register</Link>
          </li>
           }
           {user &&
           <li className='nav-item'>
                <Link to='/profile' className='btn btn-link'>Profile</Link>
           </li>
           }
           {user &&
           <li className='nav-item'>
                <Link to='/policies' className='btn btn-link'>Policies</Link>
           </li>
           }
           {user &&
           <li className='nav-item'>
               <Link to='/logout' className='btn btn-link'>Logout</Link>
           </li>
           }
        </ul>
        </div>
        </div>
        </nav>
        
    );
    }
}

export default Header;