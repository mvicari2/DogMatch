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

class SectionFive extends Component {
    constructor(props) {
        super(props)

        const sectionFiveData = this.props.sectionFiveData;

        // unroll data object into state
        this.state = {
            id: sectionFiveData.id,
            section: sectionFiveData.section,
            name: sectionFiveData.name,
            senseOfSmell: sectionFiveData.senseOfSmell,
            preyDrive: sectionFiveData.preyDrive,
            aggressionLevel: sectionFiveData.aggressionLevel,
            protectiveness: sectionFiveData.protectiveness,
            distinguishThreatening: sectionFiveData.distinguishThreatening,
            balanceStability: sectionFiveData.balanceStability,
            confidence: sectionFiveData.confidence,
            // Hover values
            senseOfSmellHover: sectionFiveData.senseOfSmell,
            preyDriveHover: sectionFiveData.preyDrive,
            aggressionLevelHover: sectionFiveData.aggressionLevel,
            protectivenessHover: sectionFiveData.protectiveness,
            distinguishThreateningHover: sectionFiveData.distinguishThreatening,
            balanceStabilityHover: sectionFiveData.balanceStability,
            confidenceHover: sectionFiveData.confidence,
            errors: {
                senseOfSmell: false,
                preyDrive: false,
                aggressionLevel: false,
                protectiveness: false,
                distinguishThreatening: false,
                balanceStability: false,
                confidence: false
            }
        };
    };

    handleSenseOfSmellChange = async e => {
        const senseOfSmell = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.senseOfSmell = await resetValError(senseOfSmell);
        this.setState({ senseOfSmell, errors });
    };

    handlePreyDriveChange = async e => {
        const preyDrive = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.preyDrive = await resetValError(preyDrive);
        this.setState({ preyDrive, errors });
    };

    handleAggressionLevelChange = async e => {
        const aggressionLevel = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.aggressionLevel = await resetValError(aggressionLevel);
        this.setState({ aggressionLevel, errors });
    };

    handleProtectivenessChange = async e => {
        const protectiveness = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.protectiveness = await resetValError(protectiveness);
        this.setState({ protectiveness, errors });
    };

    handleDistinguishThreateningChange = async e => {
        const distinguishThreatening = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.distinguishThreatening = await resetValError(distinguishThreatening);
        this.setState({ distinguishThreatening, errors });
    };

    handleBalanceStabilityChange = async e => {
        const balanceStability = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.balanceStability = await resetValError(balanceStability);
        this.setState({ balanceStability, errors });
    };

    handleConfidenceChange = async e => {
        const confidence = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.confidence = await resetValError(confidence);
        this.setState({ confidence, errors });
    };

    // Rating Icon Hover Handlers
    handleSenseOfSmellHover = async e => {
        const senseOfSmellHover = e;
        this.setState({ senseOfSmellHover });;
    };

    handlePreyDriveHover = async e => {
        const preyDriveHover = e;
        this.setState({ preyDriveHover });
    };

    handleAggressionLevelHover = async e => {
        const aggressionLevelHover = e;
        this.setState({ aggressionLevelHover });
    };

    handleProtectivenessHover = async e => {
        const protectivenessHover = e;
        this.setState({ protectivenessHover });
    };

    handleDistinguishThreateningHover = async e => {
        const distinguishThreateningHover = e;
        this.setState({ distinguishThreateningHover });
    };

    handleBalanceStabilityHover = async e => {
        const balanceStabilityHover = e;
        this.setState({ balanceStabilityHover });
    };

    handleConfidenceHover = async e => {
        const confidenceHover = e;
        this.setState({ confidenceHover });
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
                senseOfSmell: errors[0],
                preyDrive: errors[1],
                aggressionLevel: errors[2],
                protectiveness: errors[3],
                distinguishThreatening: errors[4],
                balanceStability: errors[5],
                confidence: errors[6]
            };

            // show alert at top of view (in parent)
            this.props.showErrorAlert();
            this.setState({ errors: nextErrorState });
        } else { // passed validation
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
            s.senseOfSmell,
            s.preyDrive,
            s.aggressionLevel,
            s.protectiveness,
            s.distinguishThreatening,
            s.balanceStability,
            s.confidence
        ];
        return valuesArray;
    };

    handleBackSection = async () => {
        const {
            id,
            name,
            section,
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence
        } = this.state;

        const payload = {
            id,
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence
        };

        const sectionFiveData = {
            id,
            name,
            section,
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence
        };

        await api.updateSectionFiveById(id, payload).then(res => {
            console.log(`Section Five Saved`);
            this.props.sectionBack(sectionFiveData);
        });
    };


    handleNextSection = async () => {
        const {
            id,
            name,
            section,
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence
        } = this.state;

        const payload = {
            id,
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence
        };

        const sectionFiveData = {
            id,
            name,
            section,
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence
        };

        await api.updateSectionFiveById(id, payload).then(res => {
            console.log(`Section Five Saved`);
            this.props.sectionNext(sectionFiveData);
        });
    };

    render() {
        const classes = StyledRating;
        const {
            name,
            section,
            senseOfSmell,
            preyDrive,
            aggressionLevel,
            protectiveness,
            distinguishThreatening,
            balanceStability,
            confidence,
            senseOfSmellHover,
            preyDriveHover,
            aggressionLevelHover,
            protectivenessHover,
            distinguishThreateningHover,
            balanceStabilityHover,
            confidenceHover,
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
                    <Label>Sense of Smell Rating: </Label>
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
                                <ErrorBorder border={errors.senseOfSmell && '1px solid red'}>
                                    <StyledRating
                                        name='senseOfSmellRating'
                                        value={senseOfSmell}
                                        onChange={this.handleSenseOfSmellChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleSenseOfSmellHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[senseOfSmellHover !== -1
                                        ? senseOfSmellHover
                                        : senseOfSmell
                                    ]}
                                </Box>
                                {errors.senseOfSmell &&
                                    <ValidationMsg field={'Sense of Smell'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Prey Drive Rating: </Label>
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
                                <ErrorBorder border={errors.preyDrive && '1px solid red'}>
                                    <StyledRating
                                        name='preyDriveRating'
                                        value={preyDrive}
                                        onChange={this.handlePreyDriveChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handlePreyDriveHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[preyDriveHover !== -1
                                        ? preyDriveHover
                                        : preyDrive
                                    ]}
                                </Box>
                                {errors.preyDrive &&
                                    <ValidationMsg field={'Prey Drive'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Agression Level Rating : </Label>
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
                                <ErrorBorder border={errors.aggressionLevel && '1px solid red'}>
                                    <StyledRating
                                        name='aggressionLevelRating'
                                        value={aggressionLevel}
                                        onChange={this.handleAggressionLevelChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleAggressionLevelHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[aggressionLevelHover !== -1
                                        ? aggressionLevelHover
                                        : aggressionLevel
                                    ]}
                                </Box>
                                {errors.aggressionLevel &&
                                    <ValidationMsg field={'Aggression'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Protectiveness Rating: </Label>
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
                                <ErrorBorder border={errors.protectiveness && '1px solid red'}>
                                    <StyledRating
                                        name='protectivenessRating'
                                        value={protectiveness}
                                        onChange={this.handleProtectivenessChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleProtectivenessHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[protectivenessHover !== -1
                                        ? protectivenessHover
                                        : protectiveness
                                    ]}
                                </Box>
                                {errors.protectiveness &&
                                    <ValidationMsg field={'Protectiveness'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Can Distinguish Threatening Situations Rating: </Label>
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
                                <ErrorBorder border={errors.distinguishThreatening && '1px solid red'}>
                                    <StyledRating
                                        name='stubbornnessRating'
                                        value={distinguishThreatening}
                                        onChange={this.handleDistinguishThreateningChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleDistinguishThreateningHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[distinguishThreateningHover !== -1
                                        ? distinguishThreateningHover
                                        : distinguishThreatening
                                    ]}
                                </Box>
                                {errors.distinguishThreatening &&
                                    <ValidationMsg field={'Distinguish Threatening'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Overall Balance and Stability Rating: </Label>
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
                                <ErrorBorder border={errors.balanceStability && '1px solid red'}>
                                    <StyledRating
                                        name='balanceStabilityRating'
                                        value={balanceStability}
                                        onChange={this.handleBalanceStabilityChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleBalanceStabilityHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[balanceStabilityHover !== -1
                                        ? balanceStabilityHover
                                        : balanceStability
                                    ]}
                                </Box>
                                {errors.balanceStability &&
                                    <ValidationMsg field={'Balance and Stability'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Overall Confidence Rating: </Label>
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
                                <ErrorBorder border={errors.confidence && '1px solid red'}>
                                    <StyledRating
                                        name='confidenceRating'
                                        value={confidence}
                                        onChange={this.handleConfidenceChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleConfidenceHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[confidenceHover !== -1
                                        ? confidenceHover
                                        : confidence
                                    ]}
                                </Box>
                                {errors.confidence &&
                                    <ValidationMsg field={'Confidence'} />}
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

export default SectionFive;