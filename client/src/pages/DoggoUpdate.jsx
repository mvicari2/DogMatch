import React, { Component } from 'react';
import api from '../api';
import styled, { css } from 'styled-components';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Modal from 'react-modal';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import resources from '../resources/resources';
import { FaBirthdayCake } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import config from '../config/config';
import { Footer } from '../components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

Modal.setAppElement('#root');
const animatedComponents = makeAnimated();
const maxSize = 5242880; // 5MB max image size for profile picture

const birthdayStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const Title = styled.h1.attrs({
    className: 'h1',
})`
    text-align: center;
`;

const Wrapper = styled.div.attrs({
    className: 'form-group col-sm-8',
})`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const Label = styled.label`
    margin: 5px;
`;

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

const BirthdayButton = styled.button.attrs({
    className: `btn btn-outline-primary btn-sm`,
})`
    margin: 15px 15px 15px 5px;
`;

const DeleteButton = styled.button.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;    
`;

const RemoveImgButton = styled.a.attrs({
    className: `btn btn-outline-warning btn-sm`,
})`
    margin: 15px 15px 15px 5px;
`;

const Image = styled.img`    
    max-width: 350px;
    max-height: 350px;
    width: auto;
    height: auto;
    text-align: center !important;
`;

const Radios = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const DropZoneContainer = styled.div`
    height: 200px;
    border: 2px dashed #2c67d8;
    padding: 30px;

    ${props => (props.isDragActive) && css`
        border-color: green;
    `};
`;

class DoggoUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            breed: '',
            color: [],
            age: '',
            weight: '',
            birthday: '',
            gender: '',
            modalIsOpen: false,
            profilePicture: null,
            fileName: '',
            profilePicUrl: ''
        };
    };

    imageDropContainer = () => {
        return (
            <React.Fragment>
                <div>
                    <Label>Upload Profile Picture: </Label> <br />
                    <Dropzone
                        name={'profilePicture'}
                        onDrop={this.handleOnDrop}
                        accept='image/*'
                        minSize={0}
                        maxSize={maxSize}
                        style={{}}
                    >
                        {({
                            getRootProps,
                            getInputProps,
                            isDragActive,
                            isDragReject,
                            rejectedFiles
                        }) => {
                            const isFileTooLarge =
                                rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                            return (
                                <DropZoneContainer {...getRootProps()}>
                                    <h1><FiUpload /></h1>
                                    <input {...getInputProps()} />
                                    {isDragActive
                                        ? ' Drop it when it\'s hot! '
                                        : ' Drag an image file or click anywhere in the box to upload! '}
                                    {isDragActive && !isDragReject && ' Drop it like it\'s hot! '}
                                    {isDragReject && ' File type not accepted, sorry! '}
                                    {isFileTooLarge && (
                                        <div>File is too large, 5MB max file size.</div>
                                    )}
                                </DropZoneContainer>
                            );
                        }}
                    </Dropzone>
                </div>
            </React.Fragment>
        );
    };

    handleNameChange = async e => {
        const name = e.target.value;
        this.setState({ name });
    };

    handleBreedChange = async e => {
        const breed = e.target.value;
        this.setState({ breed });
    };

    handleColorChange = async color => {
        const colorState = this.state.color;
        colorState.color = [];
        color.forEach(option => {
            colorState.color.push(option.value);
        });
        this.setState({ color: color });
    };

    handleAgeChange = async e => {
        const age = e.target.value;
        this.setState({ age });
    };

    handleWeightChange = async e => {
        const weight = e.target.value;
        this.setState({ weight });
    };

    handleBirthdayChange = (date) => {
        const birthday = date;
        this.setState({ birthday: birthday });
    };

    handleOpenModal = () => {
        this.setState({ modalIsOpen: true });
    };

    handleAfterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    };

    handleCloseModal = () => {
        this.setState({ modalIsOpen: false });
    };

    handleGenderChange = async e => {
        const gender = e.target.value;
        this.setState({ gender });
    };

    handleOnDrop = async e => {
        const profilePicture = e;
        const profilePicPreview = e[0];
        if (profilePicture.length > 0) {
            await this.setState({
                profilePicture,
                profilePicUrl: URL.createObjectURL(profilePicPreview)
            });
        };
    };

    handleRemoveImage = () => {
        const fileName = '';
        this.setState({
            profilePicUrl: '',
            fileName
        });
    };

    handleTemperamentUpdate = async () => {
        this.props.history.push(`/doggos/temperament/${this.state.id}`);
    };

    handleBiographyUpdate = async () => {
        this.props.history.push(`/doggos/biography/${this.state.id}`);
    };

    handleDeleteDoggo = async e => {
        e.preventDefault();

        if (
            window.confirm(
                `Are you sure you want to delete doggo '${this.state.name}' permanently?`,
            )
        ) {
            api.deleteDoggoById(this.state.id);
            this.props.history.push('/');
            window.location.reload();// force reload profiles
        };
    };

    componentDidMount = async () => {
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);
        const fileName = doggo.data.data.fileName;
        var profilePicPath = '';

        if (fileName == null || fileName.length === 0) {
            // will show image upload container if no filename on component mount
            profilePicPath = '';
        } else {
            profilePicPath = config.profilePicDir + fileName;
        };

        // Prepare Color Array for React-Select dropdown
        var colArray = doggo.data.data.color;
        var colorArray = colArray.map(c => ({
            value: c,
            label: c
        }));

        this.setState({
            name: doggo.data.data.name,
            breed: doggo.data.data.breed,
            color: colorArray,
            age: doggo.data.data.age,
            weight: doggo.data.data.weight,
            birthday: doggo.data.data.birthday,
            gender: doggo.data.data.gender,
            fileName: fileName,
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
            name,
            breed,
            color,
            age,
            weight,
            birthday,
            gender,
            fileName
        } = this.state;

        var colorArray = [];
        colorArray = color.map(c => c.value);

        const payload = {
            id,
            name,
            breed,
            color: colorArray,
            age,
            weight,
            birthday,
            gender,
            fileName
        };

        await api.updateDoggoById(id, payload).then(res => {
            window.alert(`Doggo updated successfully`);
            this.props.history.push('/');
        });
    };

    render() {
        const { name, breed, color, age, weight, birthday, gender } = this.state;
        const bday = this.state.birthday === '' || this.state.birthday === null
            ? 'No Birthday Entered'
            : <Moment format='MM/DD/YYYY'>{birthday}</Moment>;

        return (
            <Container>
                <Title>Update {name}'s Profile</Title>
                <Wrapper>
                    <Row>
                        <Col sm={true}>
                            <Label>Name: </Label>
                            <InputText
                                type='text'
                                value={name}
                                onChange={this.handleNameChange}
                            />
                        </Col>
                        <Col sm={true}>
                            <Label>Breed: </Label>
                            <InputText
                                type='text'
                                value={breed}
                                onChange={this.handleBreedChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={true}>
                            <Label>Color: </Label>
                            <Select
                                isMulti
                                components={animatedComponents}
                                options={resources.colorSelect}
                                value={color || ''}
                                onChange={this.handleColorChange}
                            />
                        </Col>
                        <Col sm={true}>
                            <Label>Age: </Label>
                            <InputText
                                type='number'
                                step='0.1'
                                lang='en-US'
                                min='0'
                                max='30'
                                pattern='[0-9]+([,\.][0-9]+)?'
                                value={age}
                                onChange={this.handleAgeChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={true}>
                            <Label>Weight: </Label>
                            <InputText
                                type='number'
                                step='0.1'
                                lang='en-US'
                                min='0'
                                max='250'
                                pattern='[0-9]+([,\.][0-9]+)?'
                                value={weight}
                                onChange={this.handleWeightChange}
                            />
                        </Col>
                        <Col sm={true}>
                            <Label>Gender: </Label>
                            <RadioGroup
                                name='genderRadio'
                                value={gender}
                                onChange={this.handleGenderChange}
                                row
                            >
                                <Radios>
                                    <FormControlLabel
                                        value='female'
                                        control={<Radio color='primary' />}
                                        label='Good Girl'
                                        labelPlacement='bottom'
                                    />
                                    <FormControlLabel
                                        value='male'
                                        control={<Radio color='primary' />}
                                        label='Good Boy'
                                        labelPlacement='bottom'
                                    />
                                </Radios>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Label>Birthday: {bday}</Label>
                    <br />
                    <div>
                        <BirthdayButton onClick={this.handleOpenModal}>
                            <FaBirthdayCake /> Show Birthday Calendar
                        </BirthdayButton>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.handleAfterOpenModal}
                            onRequestClose={this.handleCloseModal}
                            style={birthdayStyle}
                            contentLabel='Birthday Modal'
                        >
                            <h2 ref={subtitle => this.subtitle = subtitle}> </h2>
                            <BirthdayButton onClick={this.handleCloseModal}>Save and Close</BirthdayButton>
                            <InfiniteCalendar
                                width={400}
                                height={300}
                                display={'years'}
                                value={birthday}
                                selected={this.state.birthday || new Date()}
                                onSelect={date => {
                                    this.handleBirthdayChange(date)
                                }
                                } />
                        </Modal>
                    </div>
                    <br />
                    {this.state.profilePicUrl != null
                        ? this.state.profilePicUrl.length > 0
                            ? <div>
                                <div>
                                    <Label>Profile Picture Preview: </Label><br />
                                    <Image src={this.state.profilePicUrl} alt='profile' />
                                </div>
                                <RemoveImgButton onClick={this.handleRemoveImage}>Remove Image</RemoveImgButton>
                            </div>
                            : <this.imageDropContainer />
                        : <this.imageDropContainer />}
                    <br />

                    <Button onClick={this.handleUpdateDoggo}>Save Updated Profile</Button>
                    <br />
                    <Button onClick={this.handleTemperamentUpdate}>Update Temperament Profile</Button>
                    <Button onClick={this.handleBiographyUpdate}>Update Biography Profile</Button>
                    <br />
                    <DeleteButton onClick={this.handleDeleteDoggo}>Delete Doggo Profile</DeleteButton>
                    <Footer />
                </Wrapper>
            </Container>
        );
    };
};

export default DoggoUpdate;