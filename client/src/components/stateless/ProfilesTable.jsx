import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../../api';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import {
    PaddedWrapper,
    ProfileLink,
    UpdateLink,
    DeleteLink
} from '../../style/dog-styles';

class ViewProfile extends Component {
    viewProfile = e => {
        e.preventDefault();
        window.location.href = `/doggos/profile/${this.props.id}`;
    };

    render() {
        return <ProfileLink onClick={this.viewProfile}>View Profile</ProfileLink>
    };
};

class UpdateDoggo extends Component {
    updateProfile = e => {
        e.preventDefault();
        window.location.href = `/doggos/update/${this.props.id}`;
    };

    render() {
        return <UpdateLink onClick={this.updateProfile}>Update</UpdateLink>
    };
};

class DeleteDoggo extends Component {
    deleteProfile = e => {
        e.preventDefault();

        if (
            window.confirm(
                `Are you sure you want to delete doggo '${this.props.name}' permanently?`,
            )
        ) {
            api.deleteDoggoById(this.props.id);
            window.location.reload();
        };
    };

    render = () => {
        return <DeleteLink onClick={this.deleteProfile}>Delete</DeleteLink>
    };
};

const ProfilesTable = (profiles) => {

    const columns = [
        {
            Header: 'ID',
            accessor: '_id'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Breed',
            accessor: 'breed'
        },
        {
            Header: 'Color',
            accessor: 'color',
            Cell: props => <span>{props.value.join(', ')}</span>
        },
        {
            Header: 'Age',
            accessor: 'age'
        },
        {
            Header: 'Weight',
            accessor: 'weight'
        },
        {
            Header: 'Birthday',
            accessor: 'birthday',
            Cell: props => <Moment format='MM/DD/YYYY'>{props.value}</Moment>
        },
        {
            Header: 'Gender',
            accessor: 'gender'
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props) {
                return (
                    <span>
                        <ViewProfile id={props.original._id} />
                    </span>
                )
            },
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props) {
                return (
                    <span>
                        <UpdateDoggo id={props.original._id} />
                    </span>
                )
            },
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props) {
                return (
                    <span>
                        <DeleteDoggo id={props.original._id} name={props.original.name} />
                    </span>
                )
            },
        }
    ];

    return (
        <PaddedWrapper>
            <ReactTable
                data={profiles.profiles}
                noDataText='No Doggos Saved!'
                columns={columns}
                className='-striped -highlight'
                defaultPageSize={50}
                showPageSizeOptions={true}
                minRows={5}
            />
        </PaddedWrapper>
    );
};

export default ProfilesTable;