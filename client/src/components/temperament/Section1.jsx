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
            fireworksHover: sectionOneData.isAfraidFireworks
        };
    };

    handleEmpatheticChange = async e => {
        const empathetic = parseInt(e.target.value);
        this.setState({ empathetic });
    };

    handleAnxietyChange = async e => {
        const anxiety = parseInt(e.target.value);
        this.setState({ anxiety });
    };

    handleFearfulChange = async e => {
        const fearful = parseInt(e.target.value);
        this.setState({ fearful });
    };

    handleFireworksChange = async e => {
        const isAfraidFireworks = parseInt(e.target.value);
        this.setState({ isAfraidFireworks });
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
            fireworksHover
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
                                <Box ml={2}>
                                    {labels[empatheticHover !== -1
                                        ? empatheticHover
                                        : empathetic
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[anxietyHover !== -1
                                        ? anxietyHover
                                        : anxiety
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[fearfulHover !== -1
                                        ? fearfulHover
                                        : fearful
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[fireworksHover !== -1
                                        ? fireworksHover
                                        : isAfraidFireworks
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
                        <Button onClick={this.handleBackToProfile}>
                            Back to Basic Profile
                        </Button>
                        <Button variant='contained' color='primary' onClick={this.handleNextSection}>
                            Next Section
                        </Button>
                    </div>
                </Wrapper>
            </React.Fragment>
        );
    };
};

export default SectionOne;