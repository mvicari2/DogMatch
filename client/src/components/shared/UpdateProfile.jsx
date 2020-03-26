import React, { Component } from 'react';
import { Button } from '../../style/dog-styles';

class UpdateProfile extends Component {
    updateProfile = e => {
        e.preventDefault();
        
        this.props.history.push(`/doggos/update/${this.props.id}`);
    };

    render() {
        return  <Button onClick={this.updateProfile}>
                    Update {this.props.name}'s Profile
                </Button>
    };
};

export default UpdateProfile;