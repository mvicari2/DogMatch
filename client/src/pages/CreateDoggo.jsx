import React, { Component } from 'react';
import api from '../api';
import axios from 'axios';
import config from '../config/config';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { IoMdPaw } from 'react-icons/io';
import { validateBasicProfile, getBasicProfArr } from '../resources/Validation';

import {
    WrapperCol,
    Button,
    DangerButton,
    DangerAlert,  
    BootstrapContainer  
} from '../style/dog-styles';

import {
    BasicProfile,
    ProfileImage,
    BirthdayCalendar
} from '../components';

class CreateDoggo extends Component {
    constructor(props) {
        super(props)

        this.topOfPageRef = React.createRef();

        this.state = {
            basicProfileData: {
                name: '',
                breed: '',
                color: [],
                age: '',
                weight: '',
                gender: ''
            },
            errors: {
                name: false,
                breed: false,
                color: false,
                age: false,
                weight: false,
                gender: false
            },
            hasErrors: false,
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

    handleScroll = () => {
        const { index, selected } = this.props;
        if (index === selected) {
            setTimeout(() => {
                this.topOfPageRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        };
    };

    handleSubmitDoggo = async () => {
        // validate model
        const stateArray = await getBasicProfArr(this.state.basicProfileData);
        const errors = await validateBasicProfile(stateArray);

        if (errors.name || errors.breed || errors.color
            || errors.age || errors.weight || errors.gender) {
            this.setState({ errors, hasErrors: true });
            this.handleScroll();
        } else {
            this.handlePostDoggo();
        };
    };

    handlePostDoggo = async () => {
        const {
            profilePicture,
            basicProfileData
        } = this.state;

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
            }).then(res => {
                this.setState({ fileName: res.data.filename });
            });
        };

        const {
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
        const {
            basicProfileData,
            errors,
            hasErrors
        } = this.state;

        return (
            <BootstrapContainer>
                <WrapperCol>
                    <Typography
                        gutterBottom
                        variant='h3'
                        ref={this.topOfPageRef}
                    >
                        Create Doggo Profile
                    </Typography>

                    {hasErrors &&
                        <DangerAlert>
                            <IoMdPaw />
                            &nbsp;&nbsp; Please Fix the Errors: &nbsp;&nbsp;  
                            <IoMdPaw />
                        </DangerAlert>}

                    <BasicProfile
                        basicProfileData={basicProfileData}
                        errors={errors}
                        handleBasicProfile={this.handleBasicProfile}
                    />

                    <BirthdayCalendar
                        handleBirthday={this.handleBirthday}
                    />
                    <br />
                    <ProfileImage
                        profilePicture={this.handleProfilePicture}
                    />

                    <DangerButton href={'/'}>Cancel</DangerButton>                    
                    <Button onClick={this.handleSubmitDoggo}>Save and Next</Button>
                </WrapperCol>
            </BootstrapContainer>
        );
    };
};

export default CreateDoggo;