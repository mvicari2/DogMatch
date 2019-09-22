import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import resources from '../../resources/resources';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const animatedComponents = makeAnimated();

const Label = styled.label`
    margin: 5px;
`;

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`;

const Radios = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

class BasicProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            basicProfileData: this.props.basicProfileData
        };
    };

    handleNameChange = async e => {
        const { basicProfileData } = this.state;
        basicProfileData.name = e.target.value;

        this.setState({ basicProfileData });
        this.props.handleBasicProfile(basicProfileData);
    };

    handleBreedChange = async e => {
        const { basicProfileData } = this.state;
        basicProfileData.breed = e.target.value;

        this.setState({ basicProfileData });
        this.props.handleBasicProfile(basicProfileData);
    };

    handleColorChange = async color => {
        const { basicProfileData } = this.state;

        if (basicProfileData.color !== undefined) {
            const colorState = basicProfileData.color;

            colorState.color = [];
            color.forEach(option => {
                colorState.color.push(option.value);
            });
        };
        basicProfileData.color = color;

        this.setState({ basicProfileData });
        this.props.handleBasicProfile(basicProfileData);
    };

    handleAgeChange = async e => {
        const { basicProfileData } = this.state;
        basicProfileData.age = e.target.value;

        this.setState({ basicProfileData });
        this.props.handleBasicProfile(basicProfileData);
    };

    handleWeightChange = async e => {
        const { basicProfileData } = this.state;
        basicProfileData.weight = e.target.value;

        this.setState({ basicProfileData });
        this.props.handleBasicProfile(basicProfileData);
    };

    handleGenderChange = async e => {
        const { basicProfileData } = this.state;
        basicProfileData.gender = e.target.value;

        this.setState({ basicProfileData });
        this.props.handleBasicProfile(basicProfileData);
    };

    render() {
        const { basicProfileData } = this.state;

        return (
            <React.Fragment>
                <Row>
                    <Col sm={true}>
                        <Label>Name: </Label>
                        <InputText
                            type='text'
                            value={basicProfileData.name}
                            onChange={this.handleNameChange}
                        />
                    </Col>
                    <Col sm={true}>
                        <Label>Breed: </Label>
                        <InputText
                            type='text'
                            value={basicProfileData.breed}
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
                            value={basicProfileData.color || ''}
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
                            value={basicProfileData.age}
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
                            value={basicProfileData.weight}
                            onChange={this.handleWeightChange}
                        />
                    </Col>
                    <Col sm={true}>
                        <Label>Gender: </Label>
                        <RadioGroup
                            name='genderRadio'
                            value={basicProfileData.gender}
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
            </React.Fragment>
        );
    };
};

export default BasicProfile;