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
    TitleWrapper,
    DangerAlert,
    BootstrapContainer
} from '../style/dog-styles';

import {
    UpdateNavBar,
    BirthdayCalendar,
    ProfileImage,
    BasicProfile
} from '../components';

class UpdateDoggo extends Component {
    constructor(props) {
        super(props)

        this.topOfPageRef = React.createRef();

        this.state = {
            id: this.props.match.params.id,
            name: '',
            basicProfileData: {},
            profilePicture: null,
            fileName: '',
            profilePicUrl: '',
            errors: {
                name: false,
                breed: false,
                color: false,
                age: false,
                weight: false,
                gender: false
            },
            hasErrors: false,
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
            this.handleUpdateDoggo();
        };
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
        const {
            id,
            name,
            basicProfileData,
            birthday,
            profilePicUrl,
            errors,
            hasErrors
        } = this.state;

        return (
            <BootstrapContainer>
                <TitleWrapper>
                    <Typography
                        gutterBottom
                        variant='h2'
                        component='h1'
                        ref={this.topOfPageRef}
                    >
                        Update {name}'s Profile
                    </Typography>
                </TitleWrapper>
                {name !== '' &&
                    <UpdateNavBar
                        id={id}
                        name={name}
                        history={this.props.history}
                    />}
                <WrapperCol>
                    {hasErrors &&
                        <DangerAlert>
                            <IoMdPaw />
                            &nbsp;&nbsp; Please Fix the Errors: &nbsp;&nbsp;
                        <IoMdPaw />
                        </DangerAlert>}

                    {basicProfileData !== undefined &&
                        Object.keys(basicProfileData).length > 0 &&
                        <BasicProfile
                            basicProfileData={basicProfileData}
                            errors={errors}
                            handleBasicProfile={this.handleBasicProfile}
                        />}

                    {birthday !== undefined &&
                        birthday !== '' &&
                        <BirthdayCalendar
                            birthday={birthday}
                            handleBirthday={this.handleBirthday}
                        />}

                    {profilePicUrl !== undefined
                        && profilePicUrl !== '' &&
                        <ProfileImage
                            profilePicUrl={profilePicUrl}
                            profilePicture={this.handleProfilePicture}
                        />}
                    <br />
                    <Button onClick={this.handleSubmitDoggo}>Save Updated Profile</Button>
                    <br />
                </WrapperCol>
                {name !== '' &&
                    id !== undefined &&
                    <UpdateNavBar
                        id={id}
                        name={name}
                        history={this.props.history}
                    />}
            </BootstrapContainer>
        );
    };
};

export default UpdateDoggo;