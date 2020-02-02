import React, { Component, Fragment } from 'react';
import {createField} from "../../actions/userActions";

let InputTypes = ['Text','Checkbox', 'Color', 'Date', 'Email', 'File',
    'Month', 'Number', 'Password', 'Radio', 'Range', 'Search', 'Tel', 'Time', 'Url', 'Week', 'Textarea'];

let inputTag = ['input','select','textarea']
class PolicyFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                field:'Basic',
                type:'Text',
                value:'',
                inputTag: 'input'
            },
            submitted: false,
            errorStatus: false,
            errorMsg : null

        }
        // this.handletypechange = this.handletypechange.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        // this.handleFieldChange = this.handleFieldChange.bind(this);

    }
    // handletypechange(value){
    //     this.setState({type:value})
    // }
    // handleFieldChange(event){
    //     this.setState({field: event.target.value});
    // }
    handleChanges(event){
        const { name, value } = event.target;
        const { fields } = this.state;
        this.setState({
            fields: {
                ...fields,
                [name]: value
            }
        });

    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({ submitted: true });
        const { fields } = this.state;
        if (fields.field && fields.type && fields.value && fields.inputTag) {

            createField(fields).then(response => {
                const data = response.data;
                if(data.status === 'ERROR') {
                    this.state.errorMsg = data.payload;
                    this.setState({errorStatus: true});
                } else {
                    //this.props.history.push('/');
                    this.setState({fields: {
                        field:'Basic',
                        type:'Text',
                        value:'',
                    }})

                }
            })
        }
    }
    render() {
        const { fields } = this.state;
        return (
        <div className="container">
            <div className="container">
                <h4>ADD FIELDS</h4>
                <form>
                    <div className="form-row">
                        <label className="col-2 col-form-label">
                            Field Type
                        </label>
                        <select value={fields.field} name="field" onChange={this.handleChanges} className="form-control col-md-2">
                            <option value="Basic">Basic</option>
                            <option value="Staff">Staff</option>
                            <option value="Building">Building</option>
                            <option value="Vendors">Vendors</option>
                            <option value="Procedures">Procedures</option>
                        </select>
                    </div>
                    <br/>
                    <div className="form-row">
                        <div className="col-3">
                            <input className="form-control" type="text" name="value" value={fields.value} onChange={this.handleChanges} placeholder="Write Field Name" />
                        </div>
                        <div className='col-md-3'>
                            <select
                                onChange={(e) => this.handleChanges(e)}
                                className='form-control'
                                name="inputTag"
                                defaultValue={fields.inputTag}>
                                {
                                    inputTag.map((type) => {
                                        return <option value={type} key={type} >{ type }</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                onChange={(e) => this.handleChanges(e)}
                                className='form-control'
                                name="type"
                                defaultValue={fields.type}>
                                {
                                    InputTypes.map((type) => {
                                        return <option value={type} key={type} >{ type }</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <br/>
            <div className="container">
                <button onClick={(e) => this.handleSubmit(e)} className="btn form-control col-2 btn-sm btn-dark align-content-center">submit</button>
            </div>
        <br/>
        <br/>
        </div>
        );
    }
}
export default PolicyFields;