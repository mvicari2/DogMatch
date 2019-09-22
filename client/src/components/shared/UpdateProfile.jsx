import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

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