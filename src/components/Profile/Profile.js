import React, { Component, Fragment } from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './Style.scss';
import {getAdminFieldsList} from "../../actions/userActions";
class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 'Please write an essay about your favorite DOM element.',
            fieldsList : []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        getAdminFieldsList().then(response => {
            if(response.status === 'SUCCESS') {
                this.setState({fieldsList : response.payload})
            }
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    ShowAllBasicFields(){

        return this.state.fieldsList.filter( x=> x.categoryType === 'Basic').map((field) => {
                return (
                        <div className="form-group col-md-5">
                            <label htmlFor="inputName">{field.label}</label>
                            <input type={field.type} name={field.key} className="form-control"/>
                        </div>
                );
            })
    }

    ShowAllStaffFields() {
        return this.state.fieldsList.filter( x=> x.categoryType === 'Staff').map((field) => {
            return (
                <div className="form-group col-md-5">
                    <label htmlFor="inputName">{field.label}</label>
                    <input type={field.type} name={field.key} className="form-control"/>
                </div>
            );
        })

    }

    handleSubmit(event) {
        event.preventDefault();

    }



    render() {
        return (
            <div className='container'>
                <h4>Policy Builder!</h4>
                <div className='tab-content'>
                    <form onSubmit={this.handleSubmit}>
                    <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                        <Tab label="Basic"><div className="form-row">{this.ShowAllBasicFields()}</div></Tab>
                        <Tab label="Staff"><div className="form-row">{this.ShowAllStaffFields()}</div></Tab>
                        <Tab label="Building">Tab 3 content</Tab>
                        <Tab label="Vendors">Tab 4 content</Tab>
                        <Tab label="Procedures">Tab 5 content</Tab>
                    </Tabs>
                    </form>
                </div>
            </div>
        );
    }
}
export default Profile;