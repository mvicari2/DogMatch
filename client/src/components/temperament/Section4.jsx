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
            intelligenceHover: sectionFourData.intelligence
        };
    };

    handleAthleticLevelChange = async e => {
        const athleticLevel = parseInt(e.target.value);
        this.setState({ athleticLevel });
    };

    handleLikesExcersizeChange = async e => {
        const likesExcersize = parseInt(e.target.value);
        this.setState({ likesExcersize });
    };

    handleTrainingLevelChange = async e => {
        const trainingLevel = parseInt(e.target.value);
        this.setState({ trainingLevel });
    };

    handleTrainabilityChange = async e => {
        const trainability = parseInt(e.target.value);
        this.setState({ trainability });
    };

    handleStubbornnessChange = async e => {
        const stubbornness = parseInt(e.target.value);
        this.setState({ stubbornness });
    };

    handleIntelligenceChange = async e => {
        const intelligence = parseInt(e.target.value);
        this.setState({ intelligence });
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
            intelligenceHover
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
                                <Box ml={2}>
                                    {labels[athleticLevelHover !== -1
                                        ? athleticLevelHover
                                        : athleticLevel
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[likesExcersizeHover !== -1
                                        ? likesExcersizeHover
                                        : likesExcersize
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[trainingLevelHover !== -1
                                        ? trainingLevelHover
                                        : trainingLevel
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[trainabilityHover !== -1
                                        ? trainabilityHover
                                        : trainability
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[stubbornnessHover !== -1
                                        ? stubbornnessHover
                                        : stubbornness
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[intelligenceHover !== -1
                                        ? intelligenceHover
                                        : intelligence
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

export default SectionThree;