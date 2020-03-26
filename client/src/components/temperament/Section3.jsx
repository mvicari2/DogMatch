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
            likesTreatsHover: sectionThreeData.likesTreats,
            errors: {
                playfulness: false,
                likesPlayingHumans: false,
                likesPlayingDogs: false,
                playsFetch: false,
                likesToys: false,
                likesTreats: false
            }
        };
    };

    handlePlayfulnessChange = async e => {
        const playfulness = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.playfulness = await resetValError(playfulness);
        this.setState({ playfulness, errors });
    };

    handleLikesPlayingHumansChange = async e => {
        const likesPlayingHumans = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.likesPlayingHumans = await resetValError(likesPlayingHumans);
        this.setState({ likesPlayingHumans, errors });
    };

    handleLikesPlayingDogsChange = async e => {
        const likesPlayingDogs = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.likesPlayingDogs = await resetValError(likesPlayingDogs);
        this.setState({ likesPlayingDogs, errors });
    };

    handlePlaysFetchChange = async e => {
        const playsFetch = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.playsFetch = await resetValError(playsFetch);
        this.setState({ playsFetch, errors });
    };

    handleLikesToysChange = async e => {
        const likesToys = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.likesToys = await resetValError(likesToys);
        this.setState({ likesToys, errors });
    };

    handleLikesTreatsChange = async e => {
        const likesTreats = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.likesTreats = await resetValError(likesTreats);
        this.setState({ likesTreats, errors });
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

    handleValidation = async direction => {
        // get array of values from state
        const values = await this.getValuesArray();

        // validate values in array, returns errors
        const errors = await validateTemperament(values);

        // determine if there are greater than 0 validation errors
        const hasErrors = await determineHasErrors(errors);

        if (hasErrors) {
            const nextErrorState = {
                playfulness: errors[0],
                likesPlayingHumans: errors[1],
                likesPlayingDogs: errors[2],
                playsFetch: errors[3],
                likesToys: errors[4],
                likesTreats: errors[5]
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

        const values = [
            s.playfulness,
            s.likesPlayingHumans,
            s.likesPlayingDogs,
            s.playsFetch,
            s.likesToys,
            s.likesTreats
        ];

        return values;
    }

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
            likesTreatsHover,
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
                                <ErrorBorder border={errors.playfulness && '1px solid red'}>
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
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[playfulnessHover !== -1
                                        ? playfulnessHover
                                        : playfulness
                                    ]}
                                </Box>
                                {errors.playfulness &&
                                    <ValidationMsg field={'Playfulness'} />}
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
                                <ErrorBorder border={errors.likesPlayingHumans && '1px solid red'}>
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
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[likesPlayingHumansHover !== -1
                                        ? likesPlayingHumansHover
                                        : likesPlayingHumans
                                    ]}
                                </Box>
                                {errors.likesPlayingHumans &&
                                    <ValidationMsg field={'Enjoys Humans'} />}
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
                                <ErrorBorder border={errors.likesPlayingDogs && '1px solid red'}>
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
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[likesPlayingDogsHover !== -1
                                        ? likesPlayingDogsHover
                                        : likesPlayingDogs
                                    ]}
                                </Box>
                                {errors.likesPlayingDogs &&
                                    <ValidationMsg field={'Enjoys Other Dogs'} />}
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
                                <ErrorBorder border={errors.playsFetch && '1px solid red'}>
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
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[playsFetchHover !== -1
                                        ? playsFetchHover
                                        : playsFetch
                                    ]}
                                </Box>
                                {errors.playsFetch &&
                                    <ValidationMsg field={'Enjoys Fetch'} />}
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
                                <ErrorBorder border={errors.likesToys && '1px solid red'}>
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
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[likesToysHover !== -1
                                        ? likesToysHover
                                        : likesToys
                                    ]}
                                </Box>
                                {errors.likesToys &&
                                    <ValidationMsg field={'Likes Toys'} />}
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
                                <ErrorBorder border={errors.likesTreats && '1px solid red'}>
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
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[likesTreatsHover !== -1
                                        ? likesTreatsHover
                                        : likesTreats
                                    ]}
                                </Box>
                                {errors.likesTreats &&
                                    <ValidationMsg field={'Enjoys Treats'} />}
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