import React, { Component } from 'react';
import api from '../api';
import Typography from '@material-ui/core/Typography';
import { IoMdPaw } from 'react-icons/io';
import 'typeface-roboto';

import {
    Wrapper,
    Button,
    DangerAlert,
    BootstrapContainer
} from '../style/dog-styles';

import {
    SectionOne,
    SectionTwo,
    SectionThree,
    SectionFour,
    SectionFive,
    SectionSix,
    SectionSeven
} from '../components';

class TemperamentProfile extends Component {
    constructor(props) {
        super(props)

        this.topOfPageRef = React.createRef();

        this.state = {
            id: this.props.match.params.id,
            name: '',
            section: 1,
            hasErrors: false
        };
    };

    handleNext = async sectionData => {
        const { section } = this.state;

        // update section number
        const newSection = section + 1;

        // set section child values back into parent state
        switch (sectionData.section) {
            case 1:
                this.setState({
                    section: newSection,
                    sectionOneData: sectionData
                });
                break;
            case 2:
                this.setState({
                    section: newSection,
                    sectionTwoData: sectionData
                });
                break;
            case 3:
                this.setState({
                    section: newSection,
                    sectionThreeData: sectionData
                });
                break;
            case 4:
                this.setState({
                    section: newSection,
                    sectionFourData: sectionData
                });
                break;
            case 5:
                this.setState({
                    section: newSection,
                    sectionFiveData: sectionData
                });
                break;
            case 6:
                this.setState({
                    section: newSection,
                    sectionSixData: sectionData
                });
                break;
            default:
                console.log('Error: section data not set into parent');
        };
        this.handleScroll();
    };

    handleBack = async sectionData => {
        const { section } = this.state;

        // update section number
        const newSection = section - 1;

        // section child values and updated section number set back into parent state
        switch (sectionData.section) {
            case 2:
                this.setState({
                    section: newSection,
                    sectionTwoData: sectionData
                });
                break;
            case 3:
                this.setState({
                    section: newSection,
                    sectionThreeData: sectionData
                });
                break;
            case 4:
                this.setState({
                    section: newSection,
                    sectionFourData: sectionData
                });
                break;
            case 5:
                this.setState({
                    section: newSection,
                    sectionFiveData: sectionData
                });
                break;
            case 6:
                this.setState({
                    section: newSection,
                    sectionSixData: sectionData
                });
                break;
            case 7:
                this.setState({
                    section: newSection,
                    sectionSevenData: sectionData
                });
                break;
            default:
                console.log('Error: section data not set into parent');
        };
        this.handleScroll();
    };

    handleScroll = () => {
        const { index, selected } = this.props;
        if (index === selected) {
            setTimeout(() => {
                this.topOfPageRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        };
    };

    handleErrorAlert = async () => {
        this.setState({ hasErrors: true });
        this.handleScroll();
    };

    handleNewSection = async newSection => {
        const section = newSection;
        this.setState({ section });
    };

    handleSectionError = async () => {
        this.props.history.push('/');
    };

    componentDidMount = async () => {
        this.handleScroll(); // scroll to top on mount
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);

        const name = doggo.data.data.name;

        // handle situations where no temperament data has been posted yet (first time)
        if (doggo.data.data.temperament === undefined) {

            // set null values for section data
            const sectionOneData = {
                id,
                name,
                section: 1,
                empathetic: null,
                anxiety: null,
                fearful: null,
                isAfraidFireworks: null
            };

            const sectionTwoData = {
                id,
                name,
                section: 2,
                friendlinessOverall: null,
                goodWithPeople: null,
                goodWithOtherDogs: null,
                goodWithCats: null,
                goodWithOtherAnimals: null,
                goodWithChildren: null
            };

            const sectionThreeData = {
                id,
                name,
                section: 3,
                playfulness: null,
                likesPlayingHumans: null,
                likesPlayingDogs: null,
                playsFetch: null,
                likesToys: null,
                likesTreats: null
            };

            const sectionFourData = {
                id,
                name,
                section: 4,
                athleticLevel: null,
                likesExcersize: null,
                trainingLevel: null,
                trainability: null,
                stubbornness: null,
                intelligence: null
            };

            const sectionFiveData = {
                id,
                name,
                section: 5,
                senseOfSmell: null,
                preyDrive: null,
                aggressionLevel: null,
                protectiveness: null,
                distinguishThreatening: null,
                balanceStability: null,
                confidence: null
            };

            const sectionSixData = {
                id,
                name,
                section: 6,
                isPickyEater: null,
                shedding: null,
                barking: null,
                smellRating: null
            };

            const sectionSevenData = {
                id,
                name,
                section: 7,
                hairOrFur: null,
                housebroken: null,
                outsideOrInside: null,
                isFixed: null
            };

            this.setState({
                name: name,
                section: 1,
                sectionOneData,
                sectionTwoData,
                sectionThreeData,
                sectionFourData,
                sectionFiveData,
                sectionSixData,
                sectionSevenData
            });

        } else {// if updating 

            // set temperament object
            const temperament = doggo.data.data.temperament;

            // if bools have value tranform to string
            var housebroken = null;
            var isFixed = null;
            if (temperament.housebroken !== undefined
                && temperament.housebroken !== null) {
                housebroken = temperament.housebroken.toString();
            };

            if (temperament.isFixed !== undefined
                && temperament.isFixed !== null) {
                isFixed = temperament.isFixed.toString();
            };

            // Set data packages for each section
            const sectionOneData = {
                id,
                name,
                section: 1,
                empathetic: temperament.empathetic,
                anxiety: temperament.anxiety,
                fearful: temperament.fearful,
                isAfraidFireworks: temperament.isAfraidFireworks
            };

            const sectionTwoData = {
                id,
                name,
                section: 2,
                friendlinessOverall: temperament.friendlinessOverall,
                goodWithPeople: temperament.goodWithPeople,
                goodWithOtherDogs: temperament.goodWithOtherDogs,
                goodWithCats: temperament.goodWithCats,
                goodWithOtherAnimals: temperament.goodWithOtherAnimals,
                goodWithChildren: temperament.goodWithChildren
            };

            const sectionThreeData = {
                id,
                name,
                section: 3,
                playfulness: temperament.playfulness,
                likesPlayingHumans: temperament.likesPlayingHumans,
                likesPlayingDogs: temperament.likesPlayingDogs,
                playsFetch: temperament.playsFetch,
                likesToys: temperament.likesToys,
                likesTreats: temperament.likesTreats
            };

            const sectionFourData = {
                id,
                name,
                section: 4,
                athleticLevel: temperament.athleticLevel,
                likesExcersize: temperament.likesExcersize,
                trainingLevel: temperament.trainingLevel,
                trainability: temperament.trainability,
                stubbornness: temperament.stubbornness,
                intelligence: temperament.intelligence
            };

            const sectionFiveData = {
                id,
                name,
                section: 5,
                senseOfSmell: temperament.senseOfSmell,
                preyDrive: temperament.preyDrive,
                aggressionLevel: temperament.aggressionLevel,
                protectiveness: temperament.protectiveness,
                distinguishThreatening: temperament.distinguishThreatening,
                balanceStability: temperament.balanceStability,
                confidence: temperament.confidence
            };

            const sectionSixData = {
                id,
                name,
                section: 6,
                isPickyEater: temperament.isPickyEater,
                shedding: temperament.shedding,
                barking: temperament.barking,
                smellRating: temperament.smellRating
            };

            const sectionSevenData = {
                id,
                name,
                section: 7,
                hairOrFur: temperament.hairOrFur,
                housebroken: housebroken,
                outsideOrInside: temperament.outsideOrInside,
                isFixed: isFixed
            };

            this.setState({
                name: name,
                section: 1,
                sectionOneData,
                sectionTwoData,
                sectionThreeData,
                sectionFourData,
                sectionFiveData,
                sectionSixData,
                sectionSevenData
            });
        };
    };

    render() {
        const {
            name,
            section,
            sectionOneData,
            sectionTwoData,
            sectionThreeData,
            sectionFourData,
            sectionFiveData,
            sectionSixData,
            sectionSevenData,
            hasErrors
        } = this.state;

        const ValidationAlert = () => {
            return (
                hasErrors &&
                <DangerAlert>
                    <IoMdPaw />
                    &nbsp;&nbsp; Please Fix the Errors: &nbsp;&nbsp;
                    <IoMdPaw />
                </DangerAlert>
            );
        };

        switch (section) {
            case 1:
                return (
                    <BootstrapContainer ref={this.topOfPageRef}>
                        <Wrapper>
                            <Typography gutterBottom variant='h3'>
                                {name}'s Temperament Profile
                            </Typography>
                            <ValidationAlert />
                            {sectionOneData !== undefined &&
                                <SectionOne
                                    sectionOneData={sectionOneData}
                                    history={this.props.history}
                                    sectionNext={this.handleNext}
                                    sendNewSection={this.handleNewSection}                                    
                                    showErrorAlert={this.handleErrorAlert}
                                />}
                        </Wrapper>
                    </BootstrapContainer>
                );

            case 2:
                return (
                    <BootstrapContainer ref={this.topOfPageRef}>
                        <Wrapper>
                            <Typography gutterBottom variant='h3'>
                                {name}'s Temperament Profile
                            </Typography>
                            <ValidationAlert />
                            <SectionTwo
                                sectionTwoData={sectionTwoData}
                                sectionBack={this.handleBack}
                                sectionNext={this.handleNext}
                                sendNewSection={this.handleNewSection}                                
                                showErrorAlert={this.handleErrorAlert}
                            />
                        </Wrapper>
                    </BootstrapContainer>
                );

            case 3:
                return (
                    <BootstrapContainer ref={this.topOfPageRef}>
                        <Wrapper>
                            <Typography gutterBottom variant='h3'>
                                {name}'s Temperament Profile
                            </Typography>
                            <ValidationAlert />
                            <SectionThree
                                sectionThreeData={sectionThreeData}
                                sectionBack={this.handleBack}
                                sectionNext={this.handleNext}
                                sendNewSection={this.handleNewSection}
                                showErrorAlert={this.handleErrorAlert}
                            />
                        </Wrapper>
                    </BootstrapContainer>
                );

            case 4:
                return (
                    <BootstrapContainer ref={this.topOfPageRef}>
                        <Wrapper>
                            <Typography gutterBottom variant='h3'>
                                {name}'s Temperament Profile
                            </Typography>
                            <ValidationAlert />
                            <SectionFour
                                sectionFourData={sectionFourData}
                                sectionBack={this.handleBack}
                                sectionNext={this.handleNext}
                                sendNewSection={this.handleNewSection}
                                showErrorAlert={this.handleErrorAlert}
                            />
                        </Wrapper>
                    </BootstrapContainer>
                );

            case 5:
                return (
                    <BootstrapContainer ref={this.topOfPageRef}>
                        <Wrapper>
                            <Typography gutterBottom variant='h3'>
                                {name}'s Temperament Profile
                            </Typography>
                            <ValidationAlert />
                            <SectionFive
                                sectionFiveData={sectionFiveData}
                                sectionBack={this.handleBack}
                                sectionNext={this.handleNext}
                                sendNewSection={this.handleNewSection}
                                showErrorAlert={this.handleErrorAlert}
                            />
                        </Wrapper>
                    </BootstrapContainer>
                );

            case 6:
                return (
                    <BootstrapContainer ref={this.topOfPageRef}>
                        <Wrapper>
                            <Typography gutterBottom variant='h3'>
                                {name}'s Temperament Profile
                            </Typography>
                            <ValidationAlert />
                            <SectionSix
                                sectionSixData={sectionSixData}
                                sectionBack={this.handleBack}
                                sectionNext={this.handleNext}
                                sendNewSection={this.handleNewSection}
                                showErrorAlert={this.handleErrorAlert}
                            />
                        </Wrapper>
                    </BootstrapContainer>
                );

            case 7:
                return (
                    <BootstrapContainer ref={this.topOfPageRef}>
                        <Wrapper>
                            <Typography gutterBottom variant='h3'>
                                {name}'s Temperament Profile
                            </Typography>
                            <ValidationAlert />
                            <SectionSeven
                                sectionSevenData={sectionSevenData}
                                history={this.props.history}
                                sectionBack={this.handleBack}
                                sendNewSection={this.handleNewSection}
                                showErrorAlert={this.handleErrorAlert}
                            />
                        </Wrapper>
                    </BootstrapContainer>
                );

            default:
                return (
                    <BootstrapContainer ref={this.topOfPageRef}>
                        <Wrapper>
                            <Typography gutterBottom variant='h3'>
                                {name}'s Temperament Profile
                            </Typography>
                            Error
                            <Button onClick={this.handleSectionError}>
                                Go Back to Profiles
                            </Button>
                        </Wrapper>
                    </BootstrapContainer>
                );
        };
    };
};

export default TemperamentProfile;