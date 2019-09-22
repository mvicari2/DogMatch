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

class SectionThree extends Component {
    constructor(props) {
        super(props)

        const sectionThreeData = this.props.sectionThreeData;

        // unroll data object into state
        this.state = {
            id: sectionThreeData.id,
            section: sectionThreeData.section,
            name: sectionThreeData.name,
            playfulness: sectionThreeData.playfulness,
            likesPlayingHumans: sectionThreeData.likesPlayingHumans,
            likesPlayingDogs: sectionThreeData.likesPlayingDogs,
            playsFetch: sectionThreeData.playsFetch,
            likesToys: sectionThreeData.likesToys,
            likesTreats: sectionThreeData.likesTreats,
            // Hover values
            playfulnessHover: sectionThreeData.playfulness,
            likesPlayingHumansHover: sectionThreeData.likesPlayingHumans,
            likesPlayingDogsHover: sectionThreeData.likesPlayingDogs,
            playsFetchHover: sectionThreeData.playsFetch,
            likesToysHover: sectionThreeData.likesToys,
            likesTreatsHover: sectionThreeData.likesTreats
        };
    };

    handlePlayfulnessChange = async e => {
        const playfulness = parseInt(e.target.value);
        this.setState({ playfulness });
    };

    handleLikesPlayingHumansChange = async e => {
        const likesPlayingHumans = parseInt(e.target.value);
        this.setState({ likesPlayingHumans });
    };

    handleLikesPlayingDogsChange = async e => {
        const likesPlayingDogs = parseInt(e.target.value);
        this.setState({ likesPlayingDogs });
    };

    handlePlaysFetchChange = async e => {
        const playsFetch = parseInt(e.target.value);
        this.setState({ playsFetch });
    };

    handleLikesToysChange = async e => {
        const likesToys = parseInt(e.target.value);
        this.setState({ likesToys });
    };

    handleLikesTreatsChange = async e => {
        const likesTreats = parseInt(e.target.value);
        this.setState({ likesTreats });
    };

    // Rating Icon Hover Handlers
    handlePlayfulnessHover = async e => {
        const playfulnessHover = e;
        this.setState({ playfulnessHover });;
    };

    handleLikesPlayingHumansHover = async e => {
        const likesPlayingHumansHover = e;
        this.setState({ likesPlayingHumansHover });
    };

    handleLikesPlayingDogsHover = async e => {
        const likesPlayingDogsHover = e;
        this.setState({ likesPlayingDogsHover });
    };

    handlePlaysFetchHover = async e => {
        const playsFetchHover = e;
        this.setState({ playsFetchHover });
    };

    handleLikesToysHover = async e => {
        const likesToysHover = e;
        this.setState({ likesToysHover });
    };

    handleLikesTreatsHover = async e => {
        const likesTreatsHover = e;
        this.setState({ likesTreatsHover });
    };

    sendSection = async newSection => {
        this.props.sendNewSection(newSection);
    };

    handleBackSection = async () => {
        const {
            id,
            section,
            name,
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats
        } = this.state;

        const payload = {
            id,
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats
        };

        const sectionThreeData = {
            id,
            section,
            name,
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats
        };

        await api.updateSectionThreeById(id, payload).then(res => {
            console.log(`Section Three Saved`);
            this.props.sectionBack(sectionThreeData);
        });
    };


    handleNextSection = async () => {
        const {
            id,
            section,
            name,
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats
        } = this.state;

        const payload = {
            id,
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats
        };

        const sectionThreeData = {
            id,
            section,
            name,
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats
        };

        await api.updateSectionThreeById(id, payload).then(res => {
            console.log(`Section Three Saved`);
            this.props.sectionNext(sectionThreeData);
        });
    };

    render() {
        const classes = StyledRating;
        const {
            name,
            section,
            playfulness,
            likesPlayingHumans,
            likesPlayingDogs,
            playsFetch,
            likesToys,
            likesTreats,
            playfulnessHover,
            likesPlayingHumansHover,
            likesPlayingDogsHover,
            playsFetchHover,
            likesToysHover,
            likesTreatsHover
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
                    <Label>Playfulness Rating: </Label>
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
                                    name='playfulnessRating'
                                    value={playfulness}
                                    onChange={this.handlePlayfulnessChange}
                                    precision={1}
                                    icon={<IoMdPaw fontSize='60' />}
                                    IconContainerComponent={IconContainer}
                                    onChangeActive={(event, hover) => {
                                        this.handlePlayfulnessHover(hover);
                                    }}
                                />
                                <Box ml={2}>
                                    {labels[playfulnessHover !== -1
                                        ? playfulnessHover
                                        : playfulness
                                    ]}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Likes Playing with Humans Rating: </Label>
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
                                    name='likesPlayingHumansRating'
                                    value={likesPlayingHumans}
                                    onChange={this.handleLikesPlayingHumansChange}
                                    precision={1}
                                    icon={<IoMdPaw fontSize='60' />}
                                    IconContainerComponent={IconContainer}
                                    onChangeActive={(event, hover) => {
                                        this.handleLikesPlayingHumansHover(hover);
                                    }}
                                />
                                <Box ml={2}>
                                    {labels[likesPlayingHumansHover !== -1
                                        ? likesPlayingHumansHover
                                        : likesPlayingHumans
                                    ]}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Likes Playing With Other Dogs Rating: </Label>
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
                                    value={likesPlayingDogs}
                                    onChange={this.handleLikesPlayingDogsChange}
                                    precision={1}
                                    icon={<IoMdPaw fontSize='60' />}
                                    IconContainerComponent={IconContainer}
                                    onChangeActive={(event, hover) => {
                                        this.handleLikesPlayingDogsHover(hover);
                                    }}
                                />
                                <Box ml={2}>
                                    {labels[likesPlayingDogsHover !== -1
                                        ? likesPlayingDogsHover
                                        : likesPlayingDogs
                                    ]}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Likes Playing Fetch Rating: </Label>
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
                                    name='playsFetchRating'
                                    value={playsFetch}
                                    onChange={this.handlePlaysFetchChange}
                                    precision={1}
                                    icon={<IoMdPaw fontSize='60' />}
                                    IconContainerComponent={IconContainer}
                                    onChangeActive={(event, hover) => {
                                        this.handlePlaysFetchHover(hover);
                                    }}
                                />
                                <Box ml={2}>
                                    {labels[playsFetchHover !== -1
                                        ? playsFetchHover
                                        : playsFetch
                                    ]}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Likes Playing With Toys Rating: </Label>
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
                                    name='likesToysRating'
                                    value={likesToys}
                                    onChange={this.handleLikesToysChange}
                                    precision={1}
                                    icon={<IoMdPaw fontSize='60' />}
                                    IconContainerComponent={IconContainer}
                                    onChangeActive={(event, hover) => {
                                        this.handleLikesToysHover(hover);
                                    }}
                                />
                                <Box ml={2}>
                                    {labels[likesToysHover !== -1
                                        ? likesToysHover
                                        : likesToys
                                    ]}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Likes Doggo Treats Rating: </Label>
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
                                    name='likesTreatsRating'
                                    value={likesTreats}
                                    onChange={this.handleLikesTreatsChange}
                                    precision={1}
                                    icon={<IoMdPaw fontSize='60' />}
                                    IconContainerComponent={IconContainer}
                                    onChangeActive={(event, hover) => {
                                        this.handleLikesTreatsHover(hover);
                                    }}
                                />
                                <Box ml={2}>
                                    {labels[likesTreatsHover !== -1
                                        ? likesTreatsHover
                                        : likesTreats
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