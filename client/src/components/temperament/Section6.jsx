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
            placeholder='yes'
        >
            <div {...other} />
        </Tooltip>
    );
};

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

class SectionSix extends Component {
    constructor(props) {
        super(props)

        const sectionSixData = this.props.sectionSixData;

        // unroll data object into state
        this.state = {
            id: sectionSixData.id,
            section: sectionSixData.section,
            name: sectionSixData.name,
            isPickyEater: sectionSixData.isPickyEater,
            shedding: sectionSixData.shedding,
            barking: sectionSixData.barking,
            smellRating: sectionSixData.smellRating,
            // Hover values
            isPickyEaterHover: sectionSixData.isPickyEater,
            sheddingHover: sectionSixData.shedding,
            barkingHover: sectionSixData.barking,
            smellRatingHover: sectionSixData.smellRating,
            errors: {
                isPickyEater: false,
                shedding: false,
                barking: false,
                smellRating: false
            }
        };
    };

    handleIsPickyEaterChange = async e => {
        const isPickyEater = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.isPickyEater = await resetValError(isPickyEater);
        this.setState({ isPickyEater, errors });
    };

    handleSheddingChange = async e => {
        const shedding = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.shedding = await resetValError(shedding);
        this.setState({ shedding, errors });
    };

    handleBarkingChange = async e => {
        const barking = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.barking = await resetValError(barking);
        this.setState({ barking, errors });
    };

    handleSmellRatingChange = async e => {
        const smellRating = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.smellRating = await resetValError(smellRating);
        this.setState({ smellRating, errors });
    };

    // Rating Icon Hover Handlers
    handleIsPickyEaterHover = async e => {
        const isPickyEaterHover = e;
        this.setState({ isPickyEaterHover });;
    };

    handleSheddingHover = async e => {
        const sheddingHover = e;
        this.setState({ sheddingHover });
    };

    handleBarkingHover = async e => {
        const barkingHover = e;
        this.setState({ barkingHover });
    };

    handleSmellRatingHover = async e => {
        const smellRatingHover = e;
        this.setState({ smellRatingHover });
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
                isPickyEater: errors[0],
                shedding: errors[1],
                barking: errors[2],
                smellRating: errors[3]
            };

            this.props.showErrorAlert();
            this.setState({ errors: nextErrorState });
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
            s.isPickyEater,
            s.shedding,
            s.barking,
            s.smellRating
        ];
        return valuesArray;
    };

    handleBackSection = async () => {
        const {
            id,
            name,
            section,
            isPickyEater,
            shedding,
            barking,
            smellRating
        } = this.state;

        const payload = {
            id,
            isPickyEater,
            shedding,
            barking,
            smellRating
        };

        const sectionSixData = {
            id,
            name,
            section,
            isPickyEater,
            shedding,
            barking,
            smellRating
        };

        await api.updateSectionSixById(id, payload).then(res => {
            console.log(`Section Six Saved`);
            this.props.sectionBack(sectionSixData);
        });
    };


    handleNextSection = async () => {
        const {
            id,
            name,
            section,
            isPickyEater,
            shedding,
            barking,
            smellRating
        } = this.state;

        const payload = {
            id,
            isPickyEater,
            shedding,
            barking,
            smellRating
        };

        const sectionSixData = {
            id,
            name,
            section,
            isPickyEater,
            shedding,
            barking,
            smellRating
        };

        await api.updateSectionSixById(id, payload).then(res => {
            console.log(`Section Six Saved`);
            this.props.sectionNext(sectionSixData);
        });
    };

    render() {
        const classes = StyledRating;
        const {
            name,
            section,
            isPickyEater,
            shedding,
            barking,
            smellRating,
            isPickyEaterHover,
            sheddingHover,
            barkingHover,
            smellRatingHover,
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
                    <Label>Picky Eater Rating: </Label>
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
                                <ErrorBorder border={errors.isPickyEater && '1px solid red'}>
                                    <StyledRating
                                        name='isPickyEaterRating'
                                        value={isPickyEater}
                                        onChange={this.handleIsPickyEaterChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleIsPickyEaterHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[isPickyEaterHover !== -1
                                        ? isPickyEaterHover
                                        : isPickyEater
                                    ]}
                                </Box>
                                {errors.isPickyEater &&
                                    <ValidationMsg field={'Picky Eater'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Overall Shedding Amount Rating: </Label>
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
                                <ErrorBorder border={errors.shedding && '1px solid red'}>
                                    <StyledRating
                                        name='sheddingRating'
                                        value={shedding}
                                        onChange={this.handleSheddingChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleSheddingHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[sheddingHover !== -1
                                        ? sheddingHover
                                        : shedding
                                    ]}
                                </Box>
                                {errors.shedding &&
                                    <ValidationMsg field={'Shedding'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Barking Amount Rating : </Label>
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
                                <ErrorBorder border={errors.barking && '1px solid red'}>
                                    <StyledRating
                                        name='barkingRating'
                                        value={barking}
                                        onChange={this.handleBarkingChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleBarkingHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[barkingHover !== -1
                                        ? barkingHover
                                        : barking
                                    ]}
                                </Box>
                                {errors.barking &&
                                    <ValidationMsg field={'Barking'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Smell Rating (Overall Smelliness): </Label>
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
                                <ErrorBorder border={errors.smellRating && '1px solid red'}>
                                    <StyledRating
                                        name='smellRatingRating'
                                        value={smellRating}
                                        onChange={this.handleSmellRatingChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleSmellRatingHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[smellRatingHover !== -1
                                        ? smellRatingHover
                                        : smellRating
                                    ]}
                                </Box>
                                {errors.smellRating &&
                                    <ValidationMsg field={'Smell Rating'} />}
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
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => this.handleValidation('next')}
                        >
                            Next Section
                        </Button>
                    </div>
                </Wrapper>
            </React.Fragment >
        );
    };
};

export default SectionSix;