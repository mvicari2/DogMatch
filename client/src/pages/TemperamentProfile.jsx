import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Footer } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const stepperStyle = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const Title = styled.h1.attrs({
    className: 'h1',
})`
    text-align: center;
`;

const Wrapper = styled.div.attrs({
    className: 'form-group col-lg-10',
})`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const Radios = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const Label = styled.label`
    margin: 5px;
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

class TemperamentProfile extends Component {
    constructor(props) {
        super(props)

        this.topOfPageRef = React.createRef();

        this.state = {
            id: this.props.match.params.id,
            name: '',
            section: 1
        };
    };

    //
    // Section 1 
    //
    handleSectionOneChange = async e => {
        if (e.target.name === 'empatheticRadio') {
            const empathetic = e.target.value;
            this.setState({ empathetic });
        } else if (e.target.name === 'anxietyRadio') {
            const anxiety = e.target.value;
            this.setState({ anxiety });
        } else if (e.target.name === 'fearfulRadio') {
            const fearful = e.target.value;
            this.setState({ fearful });
        } else if (e.target.name === 'isAfraidFireworksRadio') {
            const isAfraidFireworks = e.target.value;
            this.setState({ isAfraidFireworks });
        };
    };

    sectionOne = () => {
        return (
            <React.Fragment>
                <Wrapper>
                    <Label>Please tell us about {this.state.name}</Label>
                    <br />
                    <Label>Empathetic Rating: </Label>
                    <RadioGroup
                        name='empatheticRadio'
                        value={`${this.state.empathetic}`}
                        onChange={this.handleSectionOneChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Anxiety Rating: </Label>
                    <RadioGroup
                        name='anxietyRadio'
                        value={`${this.state.anxiety}`}
                        onChange={this.handleSectionOneChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Fearful Rating: </Label>
                    <RadioGroup
                        name='fearfulRadio'
                        value={`${this.state.fearful}`}
                        onChange={this.handleSectionOneChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label> Fear/Anxiety with Fireworks Rating: </Label>
                    <RadioGroup
                        name='isAfraidFireworksRadio'
                        value={`${this.state.isAfraidFireworks}`}
                        onChange={this.handleSectionOneChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                </Wrapper>
            </React.Fragment>
        );
    };

    //
    // Section 2
    //
    handleSectionTwoChange = async e => {
        if (e.target.name === 'friendlinessOverallRadio') {
            const friendlinessOverall = e.target.value;
            this.setState({ friendlinessOverall });
        } else if (e.target.name === 'goodWithPeopleRadio') {
            const goodWithPeople = e.target.value;
            this.setState({ goodWithPeople });
        } else if (e.target.name === 'goodWithOtherDogsRadio') {
            const goodWithOtherDogs = e.target.value;
            this.setState({ goodWithOtherDogs });
        } else if (e.target.name === 'goodWithCatsRadio') {
            const goodWithCats = e.target.value;
            this.setState({ goodWithCats });
        } else if (e.target.name === 'goodWithOtherAnimalsRadio') {
            const goodWithOtherAnimals = e.target.value;
            this.setState({ goodWithOtherAnimals });
        } else if (e.target.name === 'goodWithChildrenRadio') {
            const goodWithChildren = e.target.value;
            this.setState({ goodWithChildren });
        };
    };

    sectionTwo = () => {
        return (
            <React.Fragment>
                <Wrapper>
                    <Label>Name: {this.state.name}</Label>
                    <br />
                    <Label>Overall Friendliness Rating: </Label>
                    <RadioGroup
                        name='friendlinessOverallRadio'
                        value={`${this.state.friendlinessOverall}`}
                        onChange={this.handleSectionTwoChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Good With People Rating: </Label>
                    <RadioGroup
                        name='goodWithPeopleRadio'
                        value={`${this.state.goodWithPeople}`}
                        onChange={this.handleSectionTwoChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Good with Other Dogs Rating: </Label>
                    <RadioGroup
                        name='goodWithOtherDogsRadio'
                        value={`${this.state.goodWithOtherDogs}`}
                        onChange={this.handleSectionTwoChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Good with Cats Rating: </Label>
                    <RadioGroup
                        name='goodWithCatsRadio'
                        value={`${this.state.goodWithCats}`}
                        onChange={this.handleSectionTwoChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Good with Other Animals Rating: </Label>
                    <RadioGroup
                        name='goodWithOtherAnimalsRadio'
                        value={`${this.state.goodWithOtherAnimals}`}
                        onChange={this.handleSectionTwoChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Good with Children Rating: </Label>
                    <RadioGroup
                        name='goodWithChildrenRadio'
                        value={`${this.state.goodWithChildren}`}
                        onChange={this.handleSectionTwoChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                </Wrapper>
            </React.Fragment>
        );
    };

    //
    //Section 3
    //
    handleSectionThreeRadioChange = async e => {
        if (e.target.name === 'playfulnessRadio') {
            const playfulness = e.target.value;
            this.setState({ playfulness });
        } else if (e.target.name === 'likesPlayingHumansRadio') {
            const likesPlayingHumans = e.target.value;
            this.setState({ likesPlayingHumans });
        } else if (e.target.name === 'likesPlayingDogsRadio') {
            const likesPlayingDogs = e.target.value;
            this.setState({ likesPlayingDogs });
        } else if (e.target.name === 'playsFetchRadio') {
            const playsFetch = e.target.value;
            this.setState({ playsFetch });
        } else if (e.target.name === 'likesToysRadio') {
            const likesToys = e.target.value;
            this.setState({ likesToys });
        } else if (e.target.name === 'likesTreatsRadio') {
            const likesTreats = e.target.value;
            this.setState({ likesTreats });
        }
    };

    sectionThree = () => {
        return (
            <React.Fragment>
                <Wrapper>
                    <Label>Name: {this.state.name}</Label>
                    <br />
                    <Label>Playfulness Rating: </Label>
                    <RadioGroup
                        name='playfulnessRadio'
                        value={`${this.state.playfulness}`}
                        onChange={this.handleSectionThreeRadioChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Enjoyment in Playing with Humans Rating: </Label>
                    <RadioGroup
                        name='likesPlayingHumansRadio'
                        value={`${this.state.likesPlayingHumans}`}
                        onChange={this.handleSectionThreeRadioChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Enjoys Playing with Other Dogs Rating: </Label>
                    <RadioGroup
                        name='likesPlayingDogsRadio'
                        value={`${this.state.likesPlayingDogs}`}
                        onChange={this.handleSectionThreeRadioChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Enjoys Playing Fetch Rating: </Label>
                    <RadioGroup
                        name='playsFetchRadio'
                        value={`${this.state.playsFetch}`}
                        onChange={this.handleSectionThreeRadioChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Likes Playing with Toys Rating: </Label>
                    <RadioGroup
                        name='likesToysRadio'
                        value={`${this.state.likesToys}`}
                        onChange={this.handleSectionThreeRadioChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Likes Doggo Treats Rating: </Label>
                    <RadioGroup
                        name='likesTreatsRadio'
                        value={`${this.state.likesTreats}`}
                        onChange={this.handleSectionThreeRadioChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                </Wrapper>
            </React.Fragment>
        );
    };

    //
    //Section 4
    //
    handleSectionFourChange = async e => {
        if (e.target.name === 'athleticLevelRadio') {
            const athleticLevel = e.target.value;
            this.setState({ athleticLevel });
        } else if (e.target.name === 'likesExcersizeRadio') {
            const likesExcersize = e.target.value;
            this.setState({ likesExcersize });
        } else if (e.target.name === 'trainingLevelRadio') {
            const trainingLevel = e.target.value;
            this.setState({ trainingLevel });
        } else if (e.target.name === 'trainabilityRadio') {
            const trainability = e.target.value;
            this.setState({ trainability });
        } else if (e.target.name === 'stubbornnessRadio') {
            const stubbornness = e.target.value;
            this.setState({ stubbornness });
        } else if (e.target.name === 'intelligenceRadio') {
            const intelligence = e.target.value;
            this.setState({ intelligence });
        };
    };

    sectionFour = () => {
        return (
            <React.Fragment>
                <Wrapper>
                    <Label>Name: {this.state.name}</Label>
                    <br />
                    <Label>Athletic Level Rating: </Label>
                    <RadioGroup
                        name='athleticLevelRadio'
                        value={`${this.state.athleticLevel}`}
                        onChange={this.handleSectionFourChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Likes to Excersize Rating: </Label>
                    <RadioGroup
                        name='likesExcersizeRadio'
                        value={`${this.state.likesExcersize}`}
                        onChange={this.handleSectionFourChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Current Training Level: </Label>
                    <RadioGroup
                        name='trainingLevelRadio'
                        value={`${this.state.trainingLevel}`}
                        onChange={this.handleSectionFourChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Trainability Rating: </Label>
                    <RadioGroup
                        name='trainabilityRadio'
                        value={`${this.state.trainability}`}
                        onChange={this.handleSectionFourChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Stubbornness Rating: </Label>
                    <RadioGroup
                        name='stubbornnessRadio'
                        value={`${this.state.stubbornness}`}
                        onChange={this.handleSectionFourChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Intelligence Rating: </Label>
                    <RadioGroup
                        name='intelligenceRadio'
                        value={`${this.state.intelligence}`}
                        onChange={this.handleSectionFourChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                </Wrapper>
            </React.Fragment>
        );
    };

    //
    //Section 5
    //
    handleSectionFiveChange = async e => {
        if (e.target.name === 'senseOfSmellRadio') {
            const senseOfSmell = e.target.value;
            this.setState({ senseOfSmell });
        } else if (e.target.name === 'preyDriveRadio') {
            const preyDrive = e.target.value;
            this.setState({ preyDrive });
        } else if (e.target.name === 'aggressionLevelRadio') {
            const aggressionLevel = e.target.value;
            this.setState({ aggressionLevel });
        } else if (e.target.name === 'protectivenessRadio') {
            const protectiveness = e.target.value;
            this.setState({ protectiveness });
        } else if (e.target.name === 'distinguishThreateningRadio') {
            const distinguishThreatening = e.target.value;
            this.setState({ distinguishThreatening });
        } else if (e.target.name === 'balanceStabilityRadio') {
            const balanceStability = e.target.value;
            this.setState({ balanceStability });
        } else if (e.target.name === 'confidenceRadio') {
            const confidence = e.target.value;
            this.setState({ confidence });
        }
    };

    sectionFive = () => {
        return (
            <React.Fragment>
                <Wrapper>
                    <Label>Name: {this.state.name}</Label>
                    <br />
                    <Label>Sense of Smell Rating: </Label>
                    <RadioGroup
                        name='senseOfSmellRadio'
                        value={`${this.state.senseOfSmell}`}
                        onChange={this.handleSectionFiveChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Prey Drive Rating: </Label>
                    <RadioGroup
                        name='preyDriveRadio'
                        value={`${this.state.preyDrive}`}
                        onChange={this.handleSectionFiveChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Aggression Level: </Label>
                    <RadioGroup
                        name='aggressionLevelRadio'
                        value={`${this.state.aggressionLevel}`}
                        onChange={this.handleSectionFiveChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>

                    </RadioGroup>
                    <Label>Protectiveness Rating: </Label>
                    <RadioGroup
                        name='protectivenessRadio'
                        value={`${this.state.protectiveness}`}
                        onChange={this.handleSectionFiveChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Ability to Distinguish Threatening Situations Rating: </Label>
                    <RadioGroup
                        name='distinguishThreateningRadio'
                        value={`${this.state.distinguishThreatening}`}
                        onChange={this.handleSectionFiveChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Balance and Stability Rating: </Label>
                    <RadioGroup
                        name='balanceStabilityRadio'
                        value={`${this.state.balanceStability}`}
                        onChange={this.handleSectionFiveChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Confidence Rating: </Label>
                    <RadioGroup
                        name='confidenceRadio'
                        value={`${this.state.confidence}`}
                        onChange={this.handleSectionFiveChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                </Wrapper>
            </React.Fragment>
        );
    };

    //
    //Section 6
    //
    handleSectionSixChange = async e => {
        if (e.target.name === 'isPickyEaterRadio') {
            const isPickyEater = e.target.value;
            this.setState({ isPickyEater });
        } else if (e.target.name === 'sheddingRadio') {
            const shedding = e.target.value;
            this.setState({ shedding });
        } else if (e.target.name === 'barkingRadio') {
            const barking = e.target.value;
            this.setState({ barking });
        } else if (e.target.name === 'smellRatingRadio') {
            const smellRating = e.target.value;
            this.setState({ smellRating });
        }
    }

    sectionSix = () => {
        return (
            <React.Fragment>
                <Wrapper>
                    <Label>Name: {this.state.name}</Label>
                    <br />
                    <Label>Picky Eater Rating: </Label>
                    <RadioGroup
                        name='isPickyEaterRadio'
                        value={`${this.state.isPickyEater}`}
                        onChange={this.handleSectionSixChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Shedding Amount Rating: </Label>
                    <RadioGroup
                        name='sheddingRadio'
                        value={`${this.state.shedding}`}
                        onChange={this.handleSectionSixChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Bork Amount Rating: </Label>
                    <RadioGroup
                        name='barkingRadio'
                        value={`${this.state.barking}`}
                        onChange={this.handleSectionSixChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Overall Smell Rating: </Label>
                    <RadioGroup
                        name='smellRatingRadio'
                        value={`${this.state.smellRating}`}
                        onChange={this.handleSectionSixChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='1'
                                control={<Radio color='primary' />}
                                label='1'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color='primary' />}
                                label='3'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='5'
                                control={<Radio color='primary' />}
                                label='5'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                </Wrapper>
            </React.Fragment>
        );
    };

    //
    //Section  7 
    //
    handleSectionSevenChange = async e => {
        if (e.target.name === 'hairOrFurRadio') {
            const hairOrFur = e.target.value;
            this.setState({ hairOrFur });
        } else if (e.target.name === 'housebrokenRadio') {
            const housebroken = e.target.value;
            this.setState({ housebroken });
        } else if (e.target.name === 'outsideOrInsideRadio') {
            const outsideOrInside = e.target.value;
            this.setState({ outsideOrInside });
        } else if (e.target.name === 'isFixedRadio') {
            const isFixed = e.target.value;
            this.setState({ isFixed });
        };
    };

    sectionSeven = () => {
        return (
            <React.Fragment>
                <Wrapper>
                    <Label>Name: {this.state.name}</Label>
                    <br />
                    <Label>Hair or Fur? </Label>
                    <RadioGroup
                        name='hairOrFurRadio'
                        value={`${this.state.hairOrFur}`}
                        onChange={this.handleSectionSevenChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='hair'
                                control={<Radio color='primary' />}
                                label='Hair'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='fur'
                                control={<Radio color='primary' />}
                                label='Fur'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Housebroken? </Label>
                    <RadioGroup
                        name='housebrokenRadio'
                        value={this.state.housebroken}
                        onChange={this.handleSectionSevenChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='true'
                                control={<Radio color='primary' />}
                                label='Yes'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='false'
                                control={<Radio color='primary' />}
                                label='No'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Prefers the Outside or Inside? </Label>
                    <RadioGroup
                        name='outsideOrInsideRadio'
                        value={this.state.outsideOrInside}
                        onChange={this.handleSectionSevenChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='outside'
                                control={<Radio color='primary' />}
                                label='Outside'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='inside'
                                control={<Radio color='primary' />}
                                label='Inside'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                    <Label>Spayed/Neutered? </Label>
                    <RadioGroup
                        name='isFixedRadio'
                        value={this.state.isFixed}
                        onChange={this.handleSectionSevenChange}
                        row
                    >
                        <Radios>
                            <FormControlLabel
                                value='true'
                                control={<Radio color='primary' />}
                                label='Yes'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='false'
                                control={<Radio color='primary' />}
                                label='No'
                                labelPlacement='bottom'
                            />
                        </Radios>
                    </RadioGroup>
                </Wrapper>
            </React.Fragment>
        );
    };

    getSteps = () => {
        return [
            'Section 1',
            'Section 2',
            'Section 3',
            'Section 4',
            'Section 5',
            'Section 6',
            'Section 7'
        ];
    };

    TemperamentStepper = () => {
        const classes = stepperStyle();
        const sections = this.getSteps();

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Stepper activeStep={this.state.section - 1} alternativeLabel>
                        {sections.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {this.state.section === 1 ?
                            <div>
                                <Button onClick={this.handleBackToProfile}>Back to Basic Profile</Button>
                                <Button variant="contained" color="primary" onClick={this.handleSectionNext}>
                                    Next Section
                                </Button>
                            </div>
                            : <div>
                                <div>
                                    <Button
                                        disabled={this.state.section === 0}
                                        onClick={this.handleSectionBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSectionNext}
                                    >
                                        {this.state.section - 1 === sections.length - 1
                                            ? 'Next to Biography'
                                            : 'Next Section'}
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    };

    handleSectionNext = async () => {
        const section = this.state.section + 1;
        await this.setState({ section });
        if (section < 7) {
            this.handleScroll();
        };
        this.handlePostTemperament();
    };

    handleSectionBack = async () => {
        const section = this.state.section - 1;
        await this.setState({ section });
        this.handleScroll();
        this.handlePostTemperament();
    };

    handleBackToProfile = async () => {
        this.props.history.push(`/doggos/update/${this.state.id}`);
    };

    handleScroll = () => {
        const { index, selected } = this.props;
        if (index === selected) {
            setTimeout(() => {
                this.topOfPageRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        };
    };

    componentDidMount = async () => {
        this.handleScroll(); // scroll to top on mount
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);

        // handle situations where no temperament data has been posted yet (first time)
        if (doggo.data.data.temperament === undefined) {
            this.setState({// if initial 
                name: doggo.data.data.name,
                section: 1
            })
        } else {// if updating 
            // if bools have value tranform to string
            var housebroken = null;
            var isFixed = null;
            if (doggo.data.data.temperament.housebroken !== undefined
                && doggo.data.data.temperament.housebroken !== null) {
                housebroken = doggo.data.data.temperament.housebroken.toString();
            };

            if (doggo.data.data.temperament.isFixed !== undefined
                && doggo.data.data.temperament.isFixed !== null) {
                isFixed = doggo.data.data.temperament.isFixed.toString();
            };

            this.setState({
                name: doggo.data.data.name,
                section: 1,

                // Rating -> section 1
                empathetic: doggo.data.data.temperament.empathetic,
                anxiety: doggo.data.data.temperament.anxiety,
                fearful: doggo.data.data.temperament.fearful,
                isAfraidFireworks: doggo.data.data.temperament.isAfraidFireworks,
                // section 2
                friendlinessOverall: doggo.data.data.temperament.friendlinessOverall,
                goodWithPeople: doggo.data.data.temperament.goodWithPeople,
                goodWithOtherDogs: doggo.data.data.temperament.goodWithOtherDogs,
                goodWithCats: doggo.data.data.temperament.goodWithCats,
                goodWithOtherAnimals: doggo.data.data.temperament.goodWithOtherAnimals,
                goodWithChildren: doggo.data.data.temperament.goodWithChildren,
                // section 3
                playfulness: doggo.data.data.temperament.playfulness,
                likesPlayingHumans: doggo.data.data.temperament.likesPlayingHumans,
                likesPlayingDogs: doggo.data.data.temperament.likesPlayingDogs,
                playsFetch: doggo.data.data.temperament.playsFetch,
                likesToys: doggo.data.data.temperament.likesToys,
                likesTreats: doggo.data.data.temperament.likesTreats,
                // section 4
                athleticLevel: doggo.data.data.temperament.athleticLevel,
                likesExcersize: doggo.data.data.temperament.likesExcersize,
                trainingLevel: doggo.data.data.temperament.trainingLevel,
                trainability: doggo.data.data.temperament.trainability,
                stubbornness: doggo.data.data.temperament.stubbornness,
                intelligence: doggo.data.data.temperament.intelligence,
                // section 5          
                senseOfSmell: doggo.data.data.temperament.senseOfSmell,
                preyDrive: doggo.data.data.temperament.preyDrive,
                aggressionLevel: doggo.data.data.temperament.aggressionLevel,
                protectiveness: doggo.data.data.temperament.protectiveness,
                distinguishThreatening: doggo.data.data.temperament.distinguishThreatening,
                balanceStability: doggo.data.data.temperament.balanceStability,
                // Section 6
                confidence: doggo.data.data.temperament.confidence,
                isPickyEater: doggo.data.data.temperament.isPickyEater,
                shedding: doggo.data.data.temperament.shedding,
                barking: doggo.data.data.temperament.barking,
                smellRating: doggo.data.data.temperament.smellRating,
                // section 7
                hairOrFur: doggo.data.data.temperament.hairOrFur,
                housebroken: housebroken,
                outsideOrInside: doggo.data.data.temperament.outsideOrInside,
                isFixed: isFixed
            });
        };
    };

    handlePostTemperament = async () => {
        const {
            id,
            name,
            section,
            // ratings:
            empathetic,
            anxiety,
            fearful,
            isAfraidFireworks,
            //
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren,
            //
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats,
            //
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence,
            //          
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence,
            //
            isPickyEater,
            shedding,
            barking,
            smellRating,
            //
            hairOrFur,
            housebroken,
            outsideOrInside,
            isFixed
        } = this.state;

        const payload = {
            id,
            name,
            // ratings:
            empathetic,
            anxiety,
            fearful,
            isAfraidFireworks,
            //
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren,
            //
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats,
            //
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence,
            //           
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence,
            //
            isPickyEater,
            shedding,
            barking,
            smellRating,
            //
            hairOrFur,
            housebroken,
            outsideOrInside,
            isFixed
        };

        if (section < 8) {
            await api.updateTemperamentById(id, payload).then(res => {
                console.log(`${name}'s Section ${section - 1} Saved`);
            });
        } else {
            await api.updateTemperamentById(id, payload).then(res => {
                this.props.history.push(`/doggos/biography/${id}`);
            });
        };
    };

    render() {
        const { name, section } = this.state;

        return (
            <Container ref={this.topOfPageRef}>
                <Title>{name}'s Temperament Profile</Title>
                <Wrapper>
                    {section === 1 ? <this.sectionOne /> : null}
                    {section === 2 ? <this.sectionTwo /> : null}
                    {section === 3 ? <this.sectionThree /> : null}
                    {section === 4 ? <this.sectionFour /> : null}
                    {section === 5 ? <this.sectionFive /> : null}
                    {section === 6 ? <this.sectionSix /> : null}
                    {section === 7 ? <this.sectionSeven /> : null}
                    <this.TemperamentStepper />
                    <Footer />
                </Wrapper>
            </Container>
        );
    };
};

export default TemperamentProfile;