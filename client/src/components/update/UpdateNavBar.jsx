import React, { Component } from 'react';
import api from '../../api';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { IoMdPaw } from 'react-icons/io';

const Wrapper = styled.div`      
    text-align: center;
`;

const useStyles = makeStyles({
    root: {
        height: 80
    },
});

class UpdateNavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            name: this.props.name,
            value: null
        };
    };

    handleTemperamentUpdate = async () => {
        this.props.history.push(`/doggos/temperament/${this.state.id}`);
    };

    handleBiographyUpdate = async () => {
        this.props.history.push(`/doggos/biography/${this.state.id}`);
    };

    handleAlbumUpdate = async () => {
        this.props.history.push(`/doggos/album/${this.state.id}`);
    };

    handleViewProfile = async () => {
        this.props.history.push(`/doggos/profile/${this.state.id}`)
    };

    handleDeleteDoggo = async e => {
        e.preventDefault();
        const { id, name } = this.state;

        if (
            window.confirm(
                `Are you sure you want to delete doggo '${name}' permanently?`,
            )
        ) {
            api.deleteDoggoById(id);
            this.props.history.push('/');
            window.location.reload();// force reload profiles
        };
    };

    NavContainer = () => {
        const { value } = this.state;
        const classes = useStyles();
        return (
            <BottomNavigation
                value={value}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction
                    onClick={this.handleTemperamentUpdate}
                    label='Update Temperament Profile'
                    icon={<IoMdPaw color='#0b3aa2' />}
                />
                <BottomNavigationAction
                    onClick={this.handleBiographyUpdate}
                    label='Update Biography Profile'
                    icon={<IoMdPaw color='#0b85a2' />}
                />
                <BottomNavigationAction
                    onClick={this.handleAlbumUpdate}
                    label='Update Album Images'
                    icon={<IoMdPaw color='#09718a' />}
                />
                <BottomNavigationAction
                    onClick={this.handleViewProfile}
                    label='View Profile'
                    icon={<IoMdPaw color='green' />}
                />
                <BottomNavigationAction
                    onClick={this.handleDeleteDoggo}
                    label='Delete Profile'
                    icon={<IoMdPaw color='red' />}                    
                />
            </BottomNavigation>
        );
    };

    render() {
        return (
            <React.Fragment>
                <Wrapper>
                    <this.NavContainer />
                </Wrapper>
            </React.Fragment>
        );
    };
};

export default UpdateNavBar;