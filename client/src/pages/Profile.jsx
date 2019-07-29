import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FaBirthdayCake} from 'react-icons/fa';

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

const Label = styled.h5`
    margin: 5px;
    color: #616b61;
    text-decoration: underline;
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

        window.location.href = `/doggos/update/${this.props.id}`
    }

    render() {
        return <Button onClick={this.updateProfile}>Update {this.props.name}'s Profile </Button>
    }
}

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
            smellRating: ''
        };
    }   

    handleDeleteDoggo = async e => {
        e.preventDefault();
    
        if (
            window.confirm(
                `Are you sure you want to delete doggo "${this.state.name}" permanently?`,
            )
        ) {
            api.deleteDoggoById(this.state.id);
            this.props.history.push('/');
            window.location.reload();//force reload profile table entities
        }
    };
        
    componentDidMount = async () => {
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);      

        this.setState({
            name: doggo.data.data.name,           
            breed: doggo.data.data.breed,
            color: doggo.data.data.color,
            age: doggo.data.data.age,
            weight: doggo.data.data.weight,
            birthday: doggo.data.data.birthday,
            smellRating: doggo.data.data.smellRating
        });        
    };


    render() {
        const { name, breed, color, age, weight, birthday, smellRating } = this.state;
        const bday = this.state.birthday === '' || this.state.birthday === null 
        ? 'No Birthday Entered' 
        : <Moment format="MM/DD/YYYY">{birthday}</Moment>;

        return (
            <Container>
                <Title>{name}'s Profile</Title>
                <Wrapper>
                    <Row>
                        <Col>
                            <Label>Name: </Label>
                            {name}
                        </Col>
                        <Col>
                            <Label>Breed: </Label>
                            {breed}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Label>Color: </Label> {color.join(', ')}
                        </Col>
                        <Col sm>
                            <Label>Age: </Label>
                            {age}  
                        </Col>                    
                    </Row>
                    <Row>
                        <Col>
                            <Label>Weight: </Label>
                            {weight}
                        </Col>
                        <Col>
                            <Label>Smell Rating: </Label>
                            {smellRating}
                        </Col>
                    </Row>
                    <Label>Birthday <FaBirthdayCake />: </Label> {bday}                                    
                    <br />
                    <UpdateDoggo id={this.state.id} name={this.state.name} />
                    <DeleteButton onClick={this.handleDeleteDoggo}>Delete Profile</DeleteButton>                    
                </Wrapper>
            </Container>
        )
    }
}

export default Profile;