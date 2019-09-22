import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import { FaBirthdayCake } from 'react-icons/fa';
import config from '../config/config';
import Modal from 'react-modal';
import {
    ProfileGraph,
    BiographySection,
    ProfileAlbum,
    DeleteProfile,
    UpdateProfile
} from '../components';

Modal.setAppElement('#root');

const Title = styled.h1.attrs({
    className: 'h3',
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

const ImageContainer = styled.div`    
    max-width: 450px;
    max-height: 90vh;
    width: auto;
    height: auto;
    text-align: center !important;
`;

const ColContainer = styled.div`
    width: auto;
    height: auto;
    text-align: center !important;
`;

class Profile extends Component {
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
            profilePicUrl: '',
            albumImage: null,
            displayTemperament: false,
            displayBiography: false,
            dataMap: [],
            modalIsOpen: false
        };
    };

    componentDidMount = async () => {
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);
        const fileName = doggo.data.data.fileName;
        var profilePicPath = '';

        if (fileName == null || fileName.length === 0) {
            // set default profile picture from resources folder if none has been uploaded
            profilePicPath = '';
        } else {
            profilePicPath = config.profilePicDir + fileName;
        };

        const albumFileNames = doggo.data.data.albumFileNames;
        var albumPicPaths = [];

        if (albumFileNames !== null || albumFileNames.length > 0) {
            albumFileNames.forEach(filename => {
                albumPicPaths.push(config.albumPicDir + filename);
            });
        };

        // get temperament object
        var temperament = {};
        var displayTemperament = false;
        if (doggo.data.data.biography !== undefined) {
            displayTemperament = true;
            temperament = doggo.data.data.temperament;
        };

        // get biography object
        var biography = {};
        var displayBiography = false;
        if (doggo.data.data.biography !== undefined) {
            displayBiography = true;
            biography = doggo.data.data.biography;
        };

        this.setState({
            name: doggo.data.data.name,
            breed: doggo.data.data.breed,
            color: doggo.data.data.color,
            age: doggo.data.data.age,
            weight: doggo.data.data.weight,
            birthday: doggo.data.data.birthday,
            gender: doggo.data.data.gender,
            profilePicUrl: profilePicPath,
            albumUrls: albumPicPaths,
            displayTemperament,
            displayBiography,
            biography,
            temperament
        });
    };

    render() {
        const {
            id,
            name,
            breed,
            color,
            age,
            weight,
            birthday,
            gender,
            profilePicUrl,
            albumUrls,
            temperament,
            biography,
            displayTemperament,
            displayBiography
        } = this.state;
        const bday = birthday === '' || birthday === null
            ? 'No Birthday Entered'
            : <Moment format='MM/DD/YYYY'>{birthday}</Moment>;

        return (
            <Container>
                <Row>
                    <Col sm={true}>
                        {profilePicUrl != null
                            && profilePicUrl.length > 0
                            ? <ColContainer>
                                <div>
                                    <br />
                                    <ImageContainer>
                                        <Image
                                            src={profilePicUrl}
                                            alt='Profile Pic'
                                            thumbnail
                                            fluid
                                        />
                                    </ImageContainer>
                                </div>
                            </ColContainer>
                            : <ImageContainer>
                                <Image
                                    src={require(`../../src/resources/default.jpg`)}
                                    alt='default Profile Pic'
                                    thumbnail
                                    fluid
                                />
                            </ImageContainer>}
                    </Col>
                    <Col sm={true} lg={true} md={true}>
                        <ColContainer>
                            <Title>{name}</Title>
                            <br />
                            <Table striped bordered hover size='sm'>
                                <tbody>
                                    <tr>
                                        <td>Breed: </td>
                                        <td>{breed}</td>
                                    </tr>
                                    <tr>
                                        <td>Color: </td>
                                        <td>{color.join(', ')}</td>

                                    </tr>
                                    <tr>
                                        <td>Weight: </td>
                                        <td>{weight}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender: </td>
                                        <td>{gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Age:</td>
                                        <td >{age}</td>
                                    </tr>
                                    <tr>
                                        <td><FaBirthdayCake /> </td>
                                        <td>{bday}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </ColContainer>
                    </Col>
                </Row>
                <br />

                {displayTemperament ?
                    <div>
                        <ProfileGraph temperament={temperament} />
                        <br />
                    </div> : null}

                {displayBiography ?
                    <div>
                        <BiographySection biography={biography} />
                        <br />
                    </div> : null}

                {albumUrls != null && albumUrls.length > 0 ?
                    <ProfileAlbum
                        name={name}
                        albumUrls={albumUrls}
                    /> : null}


                <Wrapper>
                    <UpdateProfile
                        id={id}
                        name={name}
                        history={this.props.history}
                    />
                    <DeleteProfile
                        id={id}
                        name={name}
                        history={this.props.history}
                    />
                </Wrapper>
            </Container>
                );
            };
        };
        
export default Profile;