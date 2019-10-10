import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import config from '../config/config';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import {
    BasicProfile,
    ProfileImage,
    BirthdayCalendar
} from '../components';

const Wrapper = styled.div.attrs({
    className: 'form-group col-sm-8',
})`    
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`;

class CreateDoggo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            basicProfileData: {
                name: '',
                breed: '',
                color: [],
                age: '',
                weight: '',
                gender: '',
            },
            profilePicture: null,
            fileName: '',
            modalIsOpen: false
        };
    };

    // set values passed from child components
    handleBasicProfile = async data => {
        const basicProfileData = data;
        this.setState({ basicProfileData });
    };

    handleBirthday = async date => {
        const birthday = date;
        this.setState({ birthday });
    };

    handleProfilePicture = async pic => {
        const profilePicture = pic;
        this.setState({ profilePicture });
    };

    handlePostDoggo = async () => {
        const { profilePicture } = this.state;

        // post profile picture, return filename
        if (profilePicture !== null) {
            const data = new FormData();
            const file = profilePicture[0];

            data.append('profilePicture', file);

            await axios({
                method: 'post',
                url: `${config.profilePicApi}`,
                data: data,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            }).then(response => {
                this.setState({ fileName: response.data.filename });
            });
        };

        const {
            basicProfileData,
            birthday,
            fileName,
        } = this.state;

        // map color array
        var colorArray = [];
        colorArray = basicProfileData.color.map(c => c.value);

        const payload = {
            name: basicProfileData.name,
            breed: basicProfileData.breed,
            color: colorArray,
            age: basicProfileData.age,
            weight: basicProfileData.weight,
            gender: basicProfileData.gender,
            birthday,
            fileName
        };

        await api.postDoggo(payload).then(res => {
            console.log(`${basicProfileData.name} basic profile successfully saved! ID: ${res.data.id}`);
            this.props.history.push(`/doggos/temperament/${res.data.id}`);
        });
    };

    render() {
        const { basicProfileData } = this.state;

        return (
            <Container>
                <Wrapper>
                    <Typography gutterBottom variant='h3'>
                        Create Doggo Profile
                    </Typography>
                    <BasicProfile
                        basicProfileData={basicProfileData}
                        handleBasicProfile={this.handleBasicProfile}
                    />

                    <BirthdayCalendar
                        handleBirthday={this.handleBirthday}
                    />
                    <br />
                    <ProfileImage
                        profilePicture={this.handleProfilePicture}
                    />

                    <CancelButton href={'/'}>Cancel</CancelButton>
                    <Button onClick={this.handlePostDoggo}>Save and Next</Button>
                </Wrapper>
            </Container>
        );
    };
};

export default CreateDoggo;