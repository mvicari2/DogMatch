import React, { Component } from 'react';
import api from '../../api';
import { DangerButton } from '../../style/dog-styles';

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
        return  <DangerButton onClick={this.deleteProfile}>
                    Delete {this.props.name}'s Profile
                </DangerButton>
    };
};

export default DeleteProfile;