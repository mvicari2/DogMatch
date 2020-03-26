import React, { Component } from 'react';
import api from '../../api';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { IoMdPaw } from 'react-icons/io';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { TemperamentStepper } from '../../components';
import ValidationMsg from '../../resources/Validation';
import {
    validateTemperament,
    determineHasErrors,
    resetValError
} from '../../resources/Validation';

import {
    StyledRating,
    Wrapper,
    Label,
    Button,
    ErrorBorder
} from '../../style/dog-styles';

const labels = {
    1: 'Very Little',
    2: 'Little',
    3: 'Neutral',
    4: 'Very',
    5: 'Extemely',
};

function IconContainer(props) {
    const { value, ...other } = props;
    return (
        <Tooltip
            title={labels[value] || ''}
            placeholder='top'
        >
            <div {...other} />
        </Tooltip>
    );
};

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

class SectionThree extends Component {
    constructor(props) {
        super(props)

        const sectionFourData = this.props.sectionFourData;

        // unroll data object into state
        this.state = {
            id: sectionFourData.id,
            section: sectionFourData.section,
            name: sectionFourData.name,
            athleticLevel: sectionFourData.athleticLevel,
            likesExcersize: sectionFourData.likesExcersize,
            trainingLevel: sectionFourData.trainingLevel,
            trainability: sectionFourData.trainability,
            stubbornness: sectionFourData.stubbornness,
            intelligence: sectionFourData.intelligence,
            // Hover values
            athleticLevelHover: sectionFourData.athleticLevel,
            likesExcersizeHover: sectionFourData.likesExcersize,
            trainingLevelHover: sectionFourData.trainingLevel,
            trainabilityHover: sectionFourData.trainability,
            stubbornnessHover: sectionFourData.stubbornness,
            intelligenceHover: sectionFourData.intelligence,
            errors: {
                athleticLevel: false,
                likesExcersize: false,
                trainingLevel: false,
                trainability: false,
                stubbornness: false,
                intelligence: false
            }
        };
    };

    handleAthleticLevelChange = async e => {
        const athleticLevel = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.athleticLevel = await resetValError(athleticLevel);
        this.setState({ athleticLevel, errors });
    };

    handleLikesExcersizeChange = async e => {
        const likesExcersize = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.likesExcersize = await resetValError(likesExcersize);
        this.setState({ likesExcersize, errors });
    };

    handleTrainingLevelChange = async e => {
        const trainingLevel = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.trainingLevel = await resetValError(trainingLevel);
        this.setState({ trainingLevel, errors });
    };

    handleTrainabilityChange = async e => {
        const trainability = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.trainability = await resetValError(trainability);
        this.setState({ trainability, errors });
    };

    handleStubbornnessChange = async e => {
        const stubbornness = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.stubbornness = await resetValError(stubbornness);
        this.setState({ stubbornness, errors });
    };

    handleIntelligenceChange = async e => {
        const intelligence = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.intelligence = await resetValError(intelligence);
        this.setState({ intelligence, errors });
    };

    // Rating Icon Hover Handlers
    handleAthleticLevelHover = async e => {
        const athleticLevelHover = e;
        this.setState({ athleticLevelHover });;
    };

    handleLikesExcersizeHover = async e => {
        const likesExcersizeHover = e;
        this.setState({ likesExcersizeHover });
    };

    handleTrainingLevelHover = async e => {
        const trainingLevelHover = e;
        this.setState({ trainingLevelHover });
    };

    handleTrainabilityHover = async e => {
        const trainabilityHover = e;
        this.setState({ trainabilityHover });
    };

    handleStubbornnessHover = async e => {
        const stubbornnessHover = e;
        this.setState({ stubbornnessHover });
    };

    handleIntelligenceHover = async e => {
        const intelligenceHover = e;
        this.setState({ intelligenceHover });
    };

    sendSection = async newSection => {
        this.props.sendNewSection(newSection);
    };

    handleValidation = async direction => {
        // get array of values from state
        const values = await this.getValuesArray();

        // validate values in array, returns errors
        const errors = await validateTemperament(values);

        // determine if there are greater than 0 validation errors
        const hasErrors = await determineHasErrors(errors);

        if (hasErrors) {
            const nextErrorsState = {
                athleticLevel: errors[0],
                likesExcersize: errors[1],
                trainingLevel: errors[2],
                trainability: errors[3],
                stubbornness: errors[4],
                intelligence: errors[5]
            };

            // show error alert on top of parent
            this.props.showErrorAlert();
            this.setState({ errors: nextErrorsState });
        } else {
            if (direction === 'back') {
                this.handleBackSection();
            } else if (direction === 'next') {
                this.handleNextSection();
            };
        };
    };

    getValuesArray = async () => {
        const s = this.state;

        const valuesArray = [
            s.athleticLevel,
            s.likesExcersize,
            s.trainingLevel,
            s.trainability,
            s.stubbornness,
            s.intelligence
        ];

        return valuesArray;
    }

    handleBackSection = async () => {
        const {
            id,
            name,
            section,
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence
        } = this.state;

        const payload = {
            id,
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence
        };

        const sectionFourData = {
            id,
            name,
            section,
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence
        };

        await api.updateSectionFourById(id, payload).then(res => {
            console.log(`Section Four Saved`);
            this.props.sectionBack(sectionFourData);
        });
    };


    handleNextSection = async () => {
        const {
            id,
            name,
            section,
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence
        } = this.state;

        const payload = {
            id,
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence
        };

        const sectionFourData = {
            id,
            name,
            section,
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence
        };

        await api.updateSectionFourById(id, payload).then(res => {
            console.log(`Section Four Saved`);
            this.props.sectionNext(sectionFourData);
        });
    };

    render() {
        const classes = StyledRating;
        const {
            name,
            section,
            athleticLevel,
            likesExcersize,
            trainingLevel,
            trainability,
            stubbornness,
            intelligence,
            athleticLevelHover,
            likesExcersizeHover,
            trainingLevelHover,
            trainabilityHover,
            stubbornnessHover,
            intelligenceHover,
            errors
        } = this.state;


        return (
            <React.Fragment>
                <Label>Please tell us about {name}</Label>
                <br />

                <TemperamentStepper
                    section={section}
                    sendSection={this.sendSection}
                />
                <br />

                <Wrapper>
                    <Label>Athletic Rating: </Label>
                    <Grid
                        container
                        spacing={10}
                        direction='column'
                        alignItems='center'
                        justify='center'
                        className={classes.container}
                    >
                        <Grid item xs={12}>
                            <Box component='fieldset' mb={3} borderColor='transparent'>
                                <ErrorBorder border={errors.athleticLevel && '1px solid red'} id='stupid'>
                                    <StyledRating
                                        name='athleticLevelRating'
                                        value={athleticLevel}
                                        onChange={this.handleAthleticLevelChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleAthleticLevelHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[athleticLevelHover !== -1
                                        ? athleticLevelHover
                                        : athleticLevel
                                    ]}
                                </Box>
                                {errors.athleticLevel &&
                                    <ValidationMsg field={'Athletic'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Likes Excersize Rating: </Label>
                    <Grid
                        container
                        spacing={10}
                        direction='column'
                        alignItems='center'
                        justify='center'
                        className={classes.container}
                    >
                        <Grid item xs={12}>
                            <Box component='fieldset' mb={3} borderColor='transparent'>
                                <ErrorBorder border={errors.likesExcersize && '1px solid red'}>
                                    <StyledRating
                                        name='likesExcersizeRating'
                                        value={likesExcersize}
                                        onChange={this.handleLikesExcersizeChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleLikesExcersizeHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[likesExcersizeHover !== -1
                                        ? likesExcersizeHover
                                        : likesExcersize
                                    ]}
                                </Box>
                                {errors.likesExcersize &&
                                    <ValidationMsg field={'Enjoys Excersize'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Level of Training: </Label>
                    <Grid
                        container
                        spacing={10}
                        direction='column'
                        alignItems='center'
                        justify='center'
                        className={classes.container}
                    >
                        <Grid item xs={12}>
                            <Box component='fieldset' mb={3} borderColor='transparent'>
                                <ErrorBorder border={errors.trainingLevel && '1px solid red'}>
                                    <StyledRating
                                        name='likesPlayingDogsRating'
                                        value={trainingLevel}
                                        onChange={this.handleTrainingLevelChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleTrainingLevelHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[trainingLevelHover !== -1
                                        ? trainingLevelHover
                                        : trainingLevel
                                    ]}
                                </Box>
                                {errors.trainingLevel &&
                                    <ValidationMsg field={'Training Level'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Trainability Rating: </Label>
                    <Grid
                        container
                        spacing={10}
                        direction='column'
                        alignItems='center'
                        justify='center'
                        className={classes.container}
                    >
                        <Grid item xs={12}>
                            <Box component='fieldset' mb={3} borderColor='transparent'>
                                <ErrorBorder border={errors.trainability && '1px solid red'}>
                                    <StyledRating
                                        name='trainabilityRating'
                                        value={trainability}
                                        onChange={this.handleTrainabilityChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleTrainabilityHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[trainabilityHover !== -1
                                        ? trainabilityHover
                                        : trainability
                                    ]}
                                </Box>
                                {errors.trainability &&
                                    <ValidationMsg field={'Trainability'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Stubbornness Rating: </Label>
                    <Grid
                        container
                        spacing={10}
                        direction='column'
                        alignItems='center'
                        justify='center'
                        className={classes.container}
                    >
                        <Grid item xs={12}>
                            <Box component='fieldset' mb={3} borderColor='transparent'>
                                <ErrorBorder border={errors.stubbornness && '1px solid red'}>
                                    <StyledRating
                                        name='stubbornnessRating'
                                        value={stubbornness}
                                        onChange={this.handleStubbornnessChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleStubbornnessHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[stubbornnessHover !== -1
                                        ? stubbornnessHover
                                        : stubbornness
                                    ]}
                                </Box>
                                {errors.stubbornness &&
                                    <ValidationMsg field={'Subbornness'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Intelligence Rating: </Label>
                    <Grid
                        container
                        spacing={10}
                        direction='column'
                        alignItems='center'
                        justify='center'
                        className={classes.container}
                    >
                        <Grid item xs={12}>
                            <Box component='fieldset' mb={3} borderColor='transparent'>
                                <ErrorBorder border={errors.intelligence && '1px solid red'}>
                                    <StyledRating
                                        name='intelligenceRating'
                                        value={intelligence}
                                        onChange={this.handleIntelligenceChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleIntelligenceHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[intelligenceHover !== -1
                                        ? intelligenceHover
                                        : intelligence
                                    ]}
                                </Box>
                                {errors.intelligence &&
                                    <ValidationMsg field={'Intelligence'} />}
                            </Box>
                        </Grid>
                    </Grid>
                </Wrapper>

                <TemperamentStepper
                    section={section}
                    sendSection={this.sendSection}
                />

                <Wrapper>
                    <div>
                        <Button onClick={() => this.handleValidation('back')}>Back</Button>
                        <Button variant='contained' color='primary' onClick={() => this.handleValidation('next')}>
                            Next Section
                        </Button>
                    </div>
                </Wrapper>
            </React.Fragment >
        );
    };
};

export default SectionThree;