import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import Select from 'react-select';
//import makeAnimated from 'react-select/animated'; //broken in npm package update for react-select
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Modal from 'react-modal';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import colorSelect from '../resources/resources';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
Modal.setAppElement('#root');
//const animatedComponents = makeAnimated(); //broken in npm package update for react-select

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

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`;

class DoggosPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            breed: '',
            color: [],
            age: '',
            weight: '',
            birthday: '',
            smellRating: '',
            modalIsOpen: false
        };
    }

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
        console.log(`Options selected:`, JSON.stringify(colorState, null, 4));
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
        console.log(birthday);
        this.setState({ birthday: birthday });
    };

    openModal = () => {
        this.setState({modalIsOpen: true});
      };
     
      afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
      };
     
      closeModal = () => {
        this.setState({modalIsOpen: false});
      };

    handleSmellratingChange = async e => {
        const smellRating = e.target.value;
        this.setState({ smellRating });
    };

    handlePostDoggo = async () => {
        const { name, breed, color, age, weight, birthday, smellRating } = this.state;

        var colorArray = [];         
        colorArray = color.map(c => c.value);
        console.log(colorArray);       
        
        const payload = { name, breed, color: colorArray, age, weight, birthday, smellRating };

        console.log(payload);

        await api.postDoggo(payload).then(res => {
            window.alert(`Doggo successfully saved!`);
            this.setState({
                name: '',
                breed: '',
                color: [],
                age: '',
                weight: '',
                birthday: '',
                smellRating: ''
            });
        });
        this.props.history.push('/doggos/profiles');
    };

    render () {
        const { name, breed, color, age, weight, birthday, smellRating } = this.state;
        const bday = this.state.birthday === '' 
        ? 'No Birthday Entered' 
        : <Moment format="MM/DD/YYYY">{birthday}</Moment>;
               
        return (            
            <Container>
                <Title>Create Doggo Profile</Title>
                <Wrapper>
                    <Row>
                        <Col>
                            <Label>Name: </Label>
                            <InputText
                            type="text"
                            value={name}
                            onChange={this.handleNameChange}
                            />
                        </Col>
                        <Col>
                            <Label>Breed: </Label>
                            <InputText
                            type="text"
                            value={breed}
                            onChange={this.handleBreedChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Label>Color: </Label>
                            <Select  
                            isMulti
                            //components={animatedComponents}//broken in npm package update for react-select                      
                            options={colorSelect}
                            value={color || ''}  
                            onChange={this.handleColorChange}
                            />                            
                        </Col>
                        <Col sm>
                            <Label>Age: </Label>
                            <InputText
                            type="number"
                            step="0.1"
                            lang="en-US"
                            min="0"
                            max="30"
                            pattern="[0-9]+([,\.][0-9]+)?"
                            value={age}
                            onChange={this.handleAgeChange}
                            />    
                        </Col>                    
                    </Row>
                    <Row>
                        <Col>
                            <Label>Weight: </Label>
                            <InputText
                            type="number"
                            step="0.1"
                            lang="en-US"
                            min="0"
                            max="250"
                            pattern="[0-9]+([,\.][0-9]+)?"
                            value={weight}
                            onChange={this.handleWeightChange}
                            />
                        </Col>
                        <Col>
                            <Label>Smell Rating: </Label>
                            <InputText
                            type="number"
                            step="0.1"
                            lang="en-US"
                            min="0"
                            max="100"
                            pattern="[0-9]+([,\.][0-9]+)?"
                            value={smellRating}
                            onChange={this.handleSmellratingChange}
                            />
                        </Col>
                    </Row>
                    <Label>Birthday: {bday}</Label>                                   
                    <br />
                    <div>
                        <Button onClick={this.openModal}><span className="glyphicon glyphicon-menu-down"></span>Show Birthday Calendar</Button>
                        <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        >            
                        <h2 ref={subtitle => this.subtitle = subtitle}> </h2>
                        <Button onClick={this.closeModal}>Save and Close</Button>
                        <InfiniteCalendar
                            width={400}
                            height={300}                            
                            display={'years'}
                            value={birthday}
                            selected={this.state.birthday || new Date()}
                            onSelect={ date => {
                                this.handleBirthdayChange(date)}
                            } />
                        </Modal>
                    </div>
                    <Button onClick={this.handlePostDoggo}>Save Doggo Profile</Button>
                    <CancelButton href={'/doggos/profiles'}>Cancel</CancelButton>
                </Wrapper>
            </Container>            
        )
    }
}

export default DoggosPost;