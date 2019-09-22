import React, { Component } from 'react';
import api from '../../api';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { IoMdPaw } from 'react-icons/io';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { TemperamentStepper } from '../../components';

const StyledRating = withStyles({
    iconFilled: {
        color: '#00468b',
    },
    iconHover: {
        color: '#00468b',
    },
})(Rating);

const Wrapper = styled.div.attrs({
    className: 'form-group col-lg-10',
})`
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
            confidenceHover: sectionFiveData.confidence
        };
    };

    handleSenseOfSmellChange = async e => {
        const senseOfSmell = parseInt(e.target.value);
        this.setState({ senseOfSmell });
    };

    handlePreyDriveChange = async e => {
        const preyDrive = parseInt(e.target.value);
        this.setState({ preyDrive });
    };

    handleAggressionLevelChange = async e => {
        const aggressionLevel = parseInt(e.target.value);
        this.setState({ aggressionLevel });
    };

    handleProtectivenessChange = async e => {
        const protectiveness = parseInt(e.target.value);
        this.setState({ protectiveness });
    };

    handleDistinguishThreateningChange = async e => {
        const distinguishThreatening = parseInt(e.target.value);
        this.setState({ distinguishThreatening });
    };

    handleBalanceStabilityChange = async e => {
        const balanceStability = parseInt(e.target.value);
        this.setState({ balanceStability });
    };

    handleConfidenceChange = async e => {
        const confidence = parseInt(e.target.value);
        this.setState({ confidence });
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
            confidenceHover
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
                                <Box ml={2}>
                                    {labels[senseOfSmellHover !== -1
                                        ? senseOfSmellHover
                                        : senseOfSmell
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[preyDriveHover !== -1
                                        ? preyDriveHover
                                        : preyDrive
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[aggressionLevelHover !== -1
                                        ? aggressionLevelHover
                                        : aggressionLevel
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[protectivenessHover !== -1
                                        ? protectivenessHover
                                        : protectiveness
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[distinguishThreateningHover !== -1
                                        ? distinguishThreateningHover
                                        : distinguishThreatening
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[balanceStabilityHover !== -1
                                        ? balanceStabilityHover
                                        : balanceStability
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[confidenceHover !== -1
                                        ? confidenceHover
                                        : confidence
                                    ]}
                                </Box>
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
                        <Button onClick={this.handleBackSection}>Back</Button>
                        <Button variant='contained' color='primary' onClick={this.handleNextSection}>
                            Next Section
                        </Button>
                    </div>
                </Wrapper>
            </React.Fragment >
        );
    };
};

export default SectionFive;