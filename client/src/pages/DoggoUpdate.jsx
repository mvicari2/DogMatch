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
import {FaBirthdayCake} from 'react-icons/fa';

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
        // const age = e.target.value.validity.valid
        // ? e.target.value
        // : this.state.age;
        // this.setState({ age });
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

      toggleBirthdayVisibility() {
        this.setState({
          visible: !this.state.visible,
        });
      };

    handleSmellratingChange = async e => {
        // const smellRating = e.target.value.validity.valid
        // ? e.target.value
        // : this.state.age;
        // this.setState({ smellRating });
        const smellRating = e.target.value;
        this.setState({ smellRating });
    };
        
    componentDidMount = async () => {
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);

        //PrepareColor Array for React-Select dropdown
        var colArray = doggo.data.data.color;
        console.log(colArray);
        var colorArray = colArray.map(c => ({
            value: c,
            label: c
        }));
          console.log(colorArray);        

        this.setState({
            name: doggo.data.data.name,           
            breed: doggo.data.data.breed,
            color: colorArray,
            age: doggo.data.data.age,
            weight: doggo.data.data.weight,
            birthday: doggo.data.data.birthday,
            smellRating: doggo.data.data.smellRating
        });        
    };

    handleUpdateDoggo = async () => {        
        const { id, name, breed, color, age, weight, birthday, smellRating } = this.state; 

        var colorArray = [];
        colorArray = color.map(c => c.value);
        console.log('Color Array for Update: ' + colorArray);

        const payload = { id, name, breed, color: colorArray, age, weight, birthday, smellRating };

        console.log('payload: ' + payload);

        await api.updateDoggoById(id, payload).then(res => {
            window.alert(`Doggo updated successfully`)
            this.setState({
                id: this.props.match.params.id,
                name: '',
                breed: '',
                color: [],
                age: '',
                weight: '',
                birthday: '',
                smellRating: ''
            });
            this.componentDidMount();
        });
    };

    render() {
        const { name, breed, color, age, weight, birthday, smellRating } = this.state;
        const bday = this.state.birthday === '' || this.state.birthday === null 
        ? 'No Birthday Entered' 
        : <Moment format="MM/DD/YYYY">{birthday}</Moment>;

        return (
            <Container>
                <Title>Update Doggo Profile</Title>
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
                        <Button onClick={this.openModal}>
                            <FaBirthdayCake /> Show Birthday Calendar
                        </Button>
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
                    <Button onClick={this.handleUpdateDoggo}>Update Doggo Profile</Button>
                    <CancelButton href={'/doggos/profiles'}>Cancel</CancelButton>
                </Wrapper>
            </Container>
        )
    }
}

export default DoggoUpdate;