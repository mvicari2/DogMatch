import React, { Component } from 'react';
import api from '../../api';
import styled from 'styled-components';

const DeleteButton = styled.button.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;    
`;

class DeleteProfile extends Component {
    deleteProfile = e => {
        e.preventDefault();

        if (
            window.confirm(
                `Are you sure you want to delete doggo '${this.props.name}' permanently?`,
            )
        ) {
            api.deleteDoggoById(this.props.id);
            this.props.history.push('/');
            window.location.reload();//force reload profiles
        };
    };

    render() {
        return  <DeleteButton onClick={this.deleteProfile}>
                    Delete {this.props.name}'s Profile
                </DeleteButton>
    };
};

export default DeleteProfile;