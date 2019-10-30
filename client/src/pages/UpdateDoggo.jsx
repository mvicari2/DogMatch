import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import config from '../config/config';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import {
    UpdateNavBar,
    BirthdayCalendar,
    ProfileImage,
    BasicProfile
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

const TitleWrapper = styled.div`
    text-align: center;
`;

class UpdateDoggo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            basicProfileData: {},
            profilePicture: null,
            fileName: '',
            profilePicUrl: ''
        };
    };

    // set state values from child components
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

    componentDidMount = async () => {
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);
        const doggoData = doggo.data.data;
        const name = doggoData.name;
        const fileName = doggoData.fileName;
        var profilePicPath = '';

        // set file path to display profile pic
        if (fileName == null || fileName.length === 0) {
            // will show image upload container if no filename on component mount
            profilePicPath = '';
        } else {
            profilePicPath = config.profilePicDir + fileName;
        };

        // Prepare Color Array for React-Select dropdown
        var colArray = doggoData.color;
        var colorArray = colArray.map(c => ({
            value: c,
            label: c
        }));

        // set data object for child component
        const basicProfileData = {
            name,
            breed: doggoData.breed,
            color: colorArray,
            age: doggoData.age,
            weight: doggoData.weight,
            birthday: doggoData.birthday,
            gender: doggoData.gender,
        };

        this.setState({
            name,
            birthday: doggoData.birthday,
            basicProfileData,
            fileName,
            profilePicUrl: profilePicPath
        });
    };

    handleUpdateDoggo = async () => {
        // post profile picture, return filename
        if (this.state.profilePicture !== null) {
            const data = new FormData();
            const file = this.state.profilePicture[0];

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
            id,
            basicProfileData,
            birthday,
            fileName
        } = this.state;

        var colorArray = [];
        colorArray = basicProfileData.color.map(c => c.value);

        const payload = {
            id,
            name: basicProfileData.name,
            breed: basicProfileData.breed,
            color: colorArray,
            age: basicProfileData.age,
            weight: basicProfileData.weight,
            gender: basicProfileData.gender,
            birthday,
            fileName
        };

        await api.updateDoggoById(id, payload).then(res => {
            window.alert(`Doggo updated successfully`);
            this.props.history.push('/');
        });
    };

    render() {
        const { id, name, basicProfileData, birthday, profilePicUrl } = this.state;

        return (
            <Container>
                <TitleWrapper>
                    <Typography gutterBottom variant='h2' component='h1'>
                        Update {name}'s Profile
                    </Typography>
                </TitleWrapper>
                {name !== '' ?
                    <UpdateNavBar
                        id={id}
                        name={name}
                        history={this.props.history}
                    /> : null}
                <Wrapper>
                    {basicProfileData !== undefined
                        && Object.keys(basicProfileData).length > 0 ?
                        <BasicProfile
                            basicProfileData={basicProfileData}
                            handleBasicProfile={this.handleBasicProfile}
                        /> : null}

                    {birthday !== undefined
                        && birthday !== '' ?
                        <BirthdayCalendar
                            birthday={birthday}
                            handleBirthday={this.handleBirthday}
                        /> : null}

                    {profilePicUrl !== undefined
                        && profilePicUrl !== '' ?
                        <ProfileImage
                            profilePicUrl={profilePicUrl}
                            profilePicture={this.handleProfilePicture}
                        /> : null}
                    <br />
                    <Button onClick={this.handleUpdateDoggo}>Save Updated Profile</Button>
                    <br />
                </Wrapper>
                {name !== ''
                    && id !== undefined ?
                    <UpdateNavBar
                        id={id}
                        name={name}
                        history={this.props.history}
                    /> : null}
            </Container>
        );
    };
};

export default UpdateDoggo;