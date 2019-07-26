// import React, { Component } from 'react';
// import api from '../api';
// import styled from 'styled-components';
// //import Select from "react-select";
// //import makeAnimated from 'react-select/animated';
// //import InfiniteCalendar from "react-infinite-calendar";
// import 'react-infinite-calendar/styles.css';
// //import Modal from 'react-modal';


// // const customStyles = {
// //     content : {
// //       top                   : '50%',
// //       left                  : '50%',
// //       right                 : 'auto',
// //       bottom                : 'auto',
// //       marginRight           : '-50%',
// //       transform             : 'translate(-50%, -50%)'
// //     }
// //   };
   
//   //Modal.setAppElement('#root'); 
//   //const animatedComponents = makeAnimated();

// const Title = styled.h1.attrs({
//     className: 'h1',
// })`
//     text-align: center;
// `;

// const Wrapper = styled.div.attrs({
//     className: 'form-group col-sm-8',
// })`
//     display: block;
//     margin-left: auto;
//     margin-right: auto;
//     text-align: center;
// `;

// const Label = styled.label`
//     margin: 5px;
// `;

// // const InputText = styled.input.attrs({
// //     className: 'form-control',
// // })`
// //     margin: 5px;
// // `;

// const DoggoValues = styled.input.attrs({
//     className: 'h5'
// })`
//     text-color: blue;
// `;

// const Button = styled.button.attrs({
//     className: `btn btn-primary`,
// })`
//     margin: 15px 15px 15px 5px;
// `;

// // const CancelButton = styled.a.attrs({
// //     className: `btn btn-danger`,
// // })`
// //     margin: 15px 15px 15px 5px;
// // `;

// class Profile extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             id: this.props.match.params.id,
//             temperment: '',
//             friends: []
//         }
//     }
        
//     componentDidMount = async () => {
//         const { id } = this.state;
//         const doggo = await api.getDoggoById(id);

//         this.setState({
//             temperment: doggo.data.data.temperment,
//             friends: doggo.data.data.friends
//         });
//     };

//     //extended prfile
//     handleUpdateDoggo = async () => {        
//         const { id, temperment, friends } = this.state;                
//         const payload = { id, temperment, friends };

//         console.log(payload);

//         await api.updateDoggoById(id, payload).then(res => {
//             window.alert(`Extended Profile Saved Successfully`)
//             this.setState({
//                 id: this.props.match.params.id,
//                 temperment: '',
//                 friends: []                 
//             })
//         });
//     };

//     render() {
//         const { temperment, friends } = this.state;
//         return (
//             <Container>
//                 <Title>{name}'s Profile</Title>
//                 <Wrapper>
//                     <Row>
//                         <Col>
//                             <Label>Name: </Label>
//                                 <DoggoValues>{name}</DoggoValues>
//                         </Col>                         

//                     <Button href={'doggos/update'}>Save Extended Profile</Button>
//                     <Button href={'/doggos/profiles'}>Back to Profile List</Button>
//                 </Wrapper>
//             </Container>
//         )
//     }
// }

// export default Profile;
