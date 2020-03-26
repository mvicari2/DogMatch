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
            placement='top'
        >
            <div {...other} />
        </Tooltip>
    );
};

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

class SectionOne extends Component {
    constructor(props) {
        super(props)

        const sectionOneData = this.props.sectionOneData;

        // unroll data object into state
        this.state = {
            id: sectionOneData.id,
            section: sectionOneData.section,
            name: sectionOneData.name,
            empathetic: sectionOneData.empathetic,
            anxiety: sectionOneData.anxiety,
            fearful: sectionOneData.anxiety,
            isAfraidFireworks: sectionOneData.isAfraidFireworks,
            // Hover values
            empatheticHover: sectionOneData.empathetic,
            anxietyHover: sectionOneData.anxiety,
            fearfulHover: sectionOneData.anxiety,
            fireworksHover: sectionOneData.isAfraidFireworks,
            // validation error bools
            errors: {
                empathetic: false,
                anxiety: false,
                fearful: false,
                isAfraidFireworks: false
            }
        };
    };

    handleEmpatheticChange = async e => {
        const empathetic = parseInt(e.target.value);
        var errors = this.state.errors;

        // reset validation error if field now passes validation
        errors.empathetic = await resetValError(empathetic);
        this.setState({ empathetic, errors });
    };

    handleAnxietyChange = async e => {
        const anxiety = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.anxiety = await resetValError(anxiety);
        this.setState({ anxiety, errors });
    };

    handleFearfulChange = async e => {
        const fearful = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.fearful = await resetValError(fearful);
        this.setState({ fearful, errors });
    };

    handleFireworksChange = async e => {
        const isAfraidFireworks = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.isAfraidFireworks = await resetValError(isAfraidFireworks);
        this.setState({ isAfraidFireworks, errors });
    };

    // Rating Icon Hover Handlers
    handleEmpatheticHover = async e => {
        const empatheticHover = e;
        this.setState({ empatheticHover });;
    };

    handleAxietyHover = async e => {
        const anxietyHover = e;
        this.setState({ anxietyHover });
    };

    handleFearfulHover = async e => {
        const fearfulHover = e;
        this.setState({ fearfulHover });
    };

    handleFireworksHover = async e => {
        const fireworksHover = e;
        this.setState({ fireworksHover });
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
            const nextErrorState = {
                empathetic: errors[0],
                anxiety: errors[1],
                fearful: errors[2],
                isAfraidFireworks: errors[3]
            };

            // show alert at top of view (in parent)
            this.props.showErrorAlert();
            this.setState({ errors: nextErrorState });
        } else {
            this.handleNextSection();
        };
    };

    getValuesArray = async () => {
        const s = this.state;

        const valuesArray = [
            s.empathetic,
            s.anxiety,
            s.fearful,
            s.isAfraidFireworks
        ];
        return valuesArray;
    };

    handleBackToProfile = async () => {
        const {
            id,
            empathetic,
            anxiety,
            fearful,
            isAfraidFireworks
        } = this.state;

        const payload = {
            id,
            empathetic,
            anxiety,
            fearful,
            isAfraidFireworks
        };

        await api.updateSectionOneById(id, payload).then(res => {
            console.log(`Section One Saved`);
            this.props.history.push(`/doggos/update/${id}`);
        });

    };

    handleNextSection = async () => {
        const {
            id,
            section,
            name,
            empathetic,
            anxiety,
            fearful,
            isAfraidFireworks
        } = this.state;

        const payload = {
            id,
            empathetic,
            anxiety,
            fearful,
            isAfraidFireworks
        };

        const sectionOneData = {
            id,
            section,
            name,
            empathetic,
            anxiety,
            fearful,
            isAfraidFireworks
        };

        await api.updateSectionOneById(id, payload).then(res => {
            console.log(`Section One Saved`);
            this.props.sectionNext(sectionOneData);
        });
    };

    render() {
        const classes = StyledRating;
        const {
            name,
            section,
            empathetic,
            anxiety,
            fearful,
            isAfraidFireworks,
            empatheticHover,
            anxietyHover,
            fearfulHover,
            fireworksHover,
            errors
        } = this.state;

        return (
            <React.Fragment>
                <Label>
                    The temperament and personality profile will help us learn more about {name}.
                    Please rate {name} using the following questions and complete each section.
                </Label>
                <br />

                <TemperamentStepper
                    section={section}
                    sendSection={this.sendSection}
                />
                <br />

                <Wrapper>
                    <Label>Empathetic Rating: </Label>
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
                                <ErrorBorder border={errors.empathetic && '1px solid red'}>
                                    <StyledRating
                                        name='empatheticRating'
                                        value={empathetic}
                                        onChange={this.handleEmpatheticChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleEmpatheticHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[empatheticHover !== -1
                                        ? empatheticHover
                                        : empathetic
                                    ]}
                                </Box>
                                {errors.empathetic && <ValidationMsg field={'Empathetic Rating'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Anxiety Rating: </Label>
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
                                <ErrorBorder border={errors.anxiety && '1px solid red'}>
                                    <StyledRating
                                        name='anxietyRating'
                                        value={anxiety}
                                        onChange={this.handleAnxietyChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleAxietyHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[anxietyHover !== -1
                                        ? anxietyHover
                                        : anxiety
                                    ]}
                                </Box>
                                {errors.anxiety && <ValidationMsg field={'Anxiety Rating'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Fearful Rating: </Label>
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
                                <ErrorBorder border={errors.fearful && '1px solid red'}>
                                    <StyledRating
                                        name='fearfulRating'
                                        value={fearful}
                                        onChange={this.handleFearfulChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleFearfulHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[fearfulHover !== -1
                                        ? fearfulHover
                                        : fearful
                                    ]}
                                </Box>
                                {errors.fearful && <ValidationMsg field={'Fearful Rating'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label> Fear/Anxiety with Fireworks Rating: </Label>
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
                                <ErrorBorder border={errors.isAfraidFireworks && '1px solid red'}>
                                    <StyledRating
                                        name='fireworksRating'
                                        value={isAfraidFireworks}
                                        onChange={this.handleFireworksChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleFireworksHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[fireworksHover !== -1
                                        ? fireworksHover
                                        : isAfraidFireworks
                                    ]}
                                </Box>
                                {errors.isAfraidFireworks && <ValidationMsg field={'Fear of Fireworks Rating'} />}
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
                        <Button onClick={this.handleBackToProfile}>
                            Back to Basic Profile
                        </Button>
                        <Button variant='contained' color='primary' onClick={this.handleValidation}>
                            Next Section
                        </Button>
                    </div>
                </Wrapper>
            </React.Fragment>
        );
    };
};

export default SectionOne;