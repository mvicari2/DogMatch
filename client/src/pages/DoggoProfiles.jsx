import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../api';
import styled from 'styled-components';
import 'react-table/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`;

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`;

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`;

class UpdateDoggo extends Component {
    updateProfile = event => {
        event.preventDefault();

        window.location.href = `/doggos/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateProfile}>Update</Update>
    }
}

class DeleteDoggo extends Component {
    deleteProfile = event => {
        event.preventDefault();

        if (
            window.confirm(
                `Are you sure you want to delete doggo # ${this.props.id} permanently?`,
            )
        ) {
            api.deleteDoggoById(this.props.id);
            window.location.reload();
        }
    }

    render = () => {
        return <Delete onClick={this.deleteProfile}>Delete</Delete>
    }
}

class DoggoProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });

        await api.getAllDoggos().then(profiles => {
            this.setState({
                profiles: profiles.data.data,
                isLoading: false,
            });
        })
    }

    render() {
        const { profiles, isLoading } = this.state;
        console.log('Doggo Profiles: ', profiles);

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true
            },
            {
                Header: 'Breed',
                accessor: 'breed',
                filterable: true
            },
            {
                Header: 'Color',
                accessor: 'color',
                filterable: true
            },
            {
                Header: 'Age',
                accessor: 'age',
                filterable: true
            },
            {
                Header: 'Weight',
                accessor: 'weight',
                filterable: true
            },
            {
                Header: 'Birthday',
                accessor: 'birthday',
                filterable: true
            },
            {
                Header: 'Smell Rating',
                accessor: 'smellRating',
                filterable: true
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteDoggo id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateDoggo id={props.original._id} />
                        </span>
                    )
                },
            },
        ];

        let showTable = true;
        if (!profiles.length) {
            showTable = false;           
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={profiles}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={50}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default DoggoProfiles;