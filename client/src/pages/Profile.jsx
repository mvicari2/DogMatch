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
import { Footer } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const albumStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into it's own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

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

const Label = styled.h5`
    margin: 5px;
    color: #616b61;
    text-align: center;
`;

const ImageContainer = styled.div`    
    max-width: 450px;
    max-height: 450px;
    width: auto;
    height: auto;
    text-align: center !important;
`;

const ColContainer = styled.div`
    width: auto;
    height: auto;
    text-align: center !important;
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

const DeleteButton = styled.button.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;    
`;

class UpdateDoggo extends Component {
    updateProfile = e => {
        e.preventDefault();

        window.location.href = `/doggos/update/${this.props.id}`;
    }

    render() {
        return <Button onClick={this.updateProfile}>Update {this.props.name}'s Profile </Button>
    }
};

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
            profilePicUrl: ''
        };
    };

    albumContainer = () => {
        const albumClass = albumStyles();
        const albumUrls = this.state.albumUrls;
        return (
            <React.Fragment>
                <div className={albumClass.root}>
                    <GridList cellHeight={350} className={albumClass.gridList} cols={2.5}>
                        {albumUrls.map((image, index) => (
                            <GridListTile key={index}>
                                <img src={image} alt='album' />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </React.Fragment>
        );
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
            window.location.reload();//force reload profiles
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

        this.setState({
            name: doggo.data.data.name,
            breed: doggo.data.data.breed,
            color: doggo.data.data.color,
            age: doggo.data.data.age,
            weight: doggo.data.data.weight,
            birthday: doggo.data.data.birthday,
            gender: doggo.data.data.gender,
            profilePicUrl: profilePicPath,
            albumUrls: albumPicPaths
        });
    };


    render() {
        const { name, breed, color, age, weight, birthday, gender, albumUrls } = this.state;
        const bday = this.state.birthday === '' || this.state.birthday === null
            ? 'No Birthday Entered'
            : <Moment format='MM/DD/YYYY'>{birthday}</Moment>;
        const image = this.state.profilePicUrl;

        return (
            <Container>
                <Row>
                    <Col sm={true}>
                        {this.state.profilePicUrl != null
                            ? this.state.profilePicUrl.length > 0
                                ? <ColContainer>
                                    <div>
                                        <br />
                                        <ImageContainer>
                                            <Image src={image} alt='Profile Pic' thumbnail fluid />
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
                                </ImageContainer>
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
                            <Table striped bordered hover size="sm">
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
                {albumUrls != null ? albumUrls.length > 0 ?
                    <div>
                        <Label>Album Images</Label>
                        <this.albumContainer />
                    </div> : null : null}
                <br />
                <Wrapper>
                    <UpdateDoggo id={this.state.id} name={this.state.name} />
                    <DeleteButton onClick={this.handleDeleteDoggo}>Delete Profile</DeleteButton>
                    <Footer />
                </Wrapper>
            </Container>
        );
    };
};

export default Profile;