import React, { Component, Fragment } from 'react';
import {getUserList} from "../../actions/userActions";
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList : []
        };
        this.renderEditable = this.renderEditable.bind(this);
    }
    componentDidMount(){
        getUserList().then(response => {
            this.setState({userList : response.payload})
        })
    }
    deleteRow(id){
        // fetch("/api/customers/delete/"+id,{
        //     method:"GET"
        // })
        //     .then(res => res.json())
        //     .then(customers => {
        //         this.setState({
        //             userList:customers
        //         })
        //     })
    }
    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.userList];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.userList[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'Name',
            //Cell: this.renderEditable
        }, {
            Header: 'Email',
            accessor: 'Email',
            //Cell: this.renderEditable
        }, /*{
            Header: 'Status',
            accessor: 'status',
            //Cell: this.renderEditable
        },*/ {
            Header: 'Action',
            Cell: props =>{
                return(
                    <div>
                        <button className="a-inside delete"
                                onClick={() =>{
                                    this.deleteRow(props.original._id)
                                }}
                        >Delete</button>
                    </div>
                )
            },
        }]
        return (
            <div className='container'>
                <h2>User List</h2>
            <ReactTable
                data={this.state.userList}
                columns={columns}
                defaultPageSize={10}
                noDataText={'No Data Found'}
                className="-striped -highlight"
            />
        </div>
    );
    }
}
function mapStateToProps(state) {
    return {
        users: state.users
    };
}
export default connect(mapStateToProps)(Admin);