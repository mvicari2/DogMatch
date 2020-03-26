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
    determineHasErrors,
    validateTemperament,
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

class SectionTwo extends Component {
    constructor(props) {
        super(props)

        const sectionTwoData = this.props.sectionTwoData;

        // unroll data object into state
        this.state = {
            id: sectionTwoData.id,
            section: sectionTwoData.section,
            name: sectionTwoData.name,
            friendlinessOverall: sectionTwoData.friendlinessOverall,
            goodWithPeople: sectionTwoData.goodWithPeople,
            goodWithOtherDogs: sectionTwoData.goodWithOtherDogs,
            goodWithCats: sectionTwoData.goodWithCats,
            goodWithOtherAnimals: sectionTwoData.goodWithOtherAnimals,
            goodWithChildren: sectionTwoData.goodWithChildren,
            // Hover Values
            friendlinessOverallHover: sectionTwoData.friendlinessOverall,
            goodWithPeopleHover: sectionTwoData.goodWithPeople,
            goodWithOtherDogsHover: sectionTwoData.goodWithOtherDogs,
            goodWithCatsHover: sectionTwoData.goodWithCats,
            goodWithOtherAnimalsHover: sectionTwoData.goodWithOtherAnimals,
            goodWithChildrenHover: sectionTwoData.goodWithChildren,
            errors: {
                friendlinessOverall: false,
                goodWithPeople: false,
                goodWithOtherDogs: false,
                goodWithCats: false,
                goodWithOtherAnimals: false,
                goodWithChildren: false
            }
        };
    };

    handleFriendlinessOverallChange = async e => {
        const friendlinessOverall = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.friendlinessOverall = await resetValError(friendlinessOverall);
        this.setState({ friendlinessOverall, errors });
    };

    handleGoodWithPeopleChange = async e => {
        const goodWithPeople = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.goodWithPeople = await resetValError(goodWithPeople);        
        this.setState({ goodWithPeople, errors });
    };

    handleGoodWithOtherDogsChange = async e => {
        const goodWithOtherDogs = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.goodWithOtherDogs = await resetValError(goodWithOtherDogs);
        this.setState({ goodWithOtherDogs, errors });
    };

    handleGoodWithCatsChange = async e => {
        const goodWithCats = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.goodWithCats = await resetValError(goodWithCats);
        this.setState({ goodWithCats, errors });
    };

    handleGoodWithOtherAnimalsChange = async e => {
        const goodWithOtherAnimals = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.goodWithOtherAnimals = await resetValError(goodWithOtherAnimals);
        this.setState({ goodWithOtherAnimals, errors });
    };

    handleGoodWithChildrenChange = async e => {
        const goodWithChildren = parseInt(e.target.value);
        var errors = this.state.errors;

        errors.goodWithChildren = await resetValError(goodWithChildren);
        this.setState({ goodWithChildren, errors });
    };

    // Rating Icon Hover Handlers
    handleFriendlinessOverallHover = async e => {
        const friendlinessOverallHover = e;
        this.setState({ friendlinessOverallHover });;
    };

    handleGoodWithPeopleHover = async e => {
        const goodWithPeopleHover = e;
        this.setState({ goodWithPeopleHover });
    };

    handleGoodWithOtherDogsHover = async e => {
        const goodWithOtherDogsHover = e;
        this.setState({ goodWithOtherDogsHover });
    };

    handleGoodWithCatsHover = async e => {
        const goodWithCatsHover = e;
        this.setState({ goodWithCatsHover });
    };

    handleGoodWithOtherAnimalsHover = async e => {
        const goodWithOtherAnimalsHover = e;
        this.setState({ goodWithOtherAnimalsHover });
    };

    handleGoodWithChildrenHover = async e => {
        const goodWithChildrenHover = e;
        this.setState({ goodWithChildrenHover });
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
                friendlinessOverall: errors[0],
                goodWithPeople: errors[1],
                goodWithOtherDogs: errors[2],
                goodWithCats: errors[3],
                goodWithOtherAnimals: errors[4],
                goodWithChildren: errors[5]
            };

            // show alert at top of view (in parent)
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
            s.friendlinessOverall,
            s.goodWithPeople,
            s.goodWithOtherDogs,
            s.goodWithCats,
            s.goodWithOtherAnimals,
            s.goodWithChildren
        ];
        return valuesArray;
    };

    handleBackSection = async () => {
        const {
            id,
            section,
            name,
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren
        } = this.state;

        const payload = {
            id,
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren
        };

        const sectionTwoData = {
            id,
            section,
            name,
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren
        };

        await api.updateSectionTwoById(id, payload).then(res => {
            console.log(`Section Two Saved`);
            this.props.sectionBack(sectionTwoData);
        });
    };


    handleNextSection = async () => {
        const {
            id,
            section,
            name,
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren
        } = this.state;

        const payload = {
            id,
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren
        };

        const sectionTwoData = {
            id,
            section,
            name,
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren
        };

        await api.updateSectionTwoById(id, payload).then(res => {
            console.log(`Section Two Saved`);
            this.props.sectionNext(sectionTwoData);
        });
    };

    render() {
        const classes = StyledRating;
        const {
            name,
            section,
            friendlinessOverall,
            goodWithPeople,
            goodWithOtherDogs,
            goodWithCats,
            goodWithOtherAnimals,
            goodWithChildren,
            friendlinessOverallHover,
            goodWithPeopleHover,
            goodWithOtherDogsHover,
            goodWithCatsHover,
            goodWithOtherAnimalsHover,
            goodWithChildrenHover,
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
                    <Label>Overall Friendliness Rating: </Label>
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
                                <ErrorBorder border={errors.friendlinessOverall && '1px solid red'}>
                                    <StyledRating
                                        name='friendlinessOverallRating'
                                        value={friendlinessOverall}
                                        onChange={this.handleFriendlinessOverallChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleFriendlinessOverallHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[friendlinessOverallHover !== -1
                                        ? friendlinessOverallHover
                                        : friendlinessOverall
                                    ]}
                                </Box>
                                {errors.friendlinessOverall &&
                                    <ValidationMsg field={'Overall Friendliness'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Good With People Rating: </Label>
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
                                <ErrorBorder border={errors.goodWithPeople && '1px solid red'}>
                                    <StyledRating
                                        name='goodWithPeopleRating'
                                        value={goodWithPeople}
                                        onChange={this.handleGoodWithPeopleChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleGoodWithPeopleHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[goodWithPeopleHover !== -1
                                        ? goodWithPeopleHover
                                        : goodWithPeople
                                    ]}
                                </Box>
                                {errors.goodWithPeople &&
                                    <ValidationMsg field={'Good with People'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Good With Other Dogs Rating: </Label>
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
                                <ErrorBorder border={errors.goodWithOtherDogs && '1px solid red'}>
                                    <StyledRating
                                        name='goodWithOtherDogsRating'
                                        value={goodWithOtherDogs}
                                        onChange={this.handleGoodWithOtherDogsChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleGoodWithOtherDogsHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[goodWithOtherDogsHover !== -1
                                        ? goodWithOtherDogsHover
                                        : goodWithOtherDogs
                                    ]}
                                </Box>
                                {errors.goodWithOtherDogs &&
                                    <ValidationMsg field={'Good with Other Dogs'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Good With Cats Rating: </Label>
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
                                <ErrorBorder border={errors.goodWithCats && '1px solid red'}>
                                    <StyledRating
                                        name='goodWithCatsRating'
                                        value={goodWithCats}
                                        onChange={this.handleGoodWithCatsChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleGoodWithCatsHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[goodWithCatsHover !== -1
                                        ? goodWithCatsHover
                                        : goodWithCats
                                    ]}
                                </Box>
                                {errors.goodWithCats &&
                                    <ValidationMsg field={'Good with Cats'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Good With Other Animals (not dogs/cats) Rating: </Label>
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
                                <ErrorBorder border={errors.goodWithOtherAnimals && '1px solid red'}>
                                    <StyledRating
                                        name='goodWithOtherAnimalsRating'
                                        value={goodWithOtherAnimals}
                                        onChange={this.handleGoodWithOtherAnimalsChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleGoodWithOtherAnimalsHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[goodWithOtherAnimalsHover !== -1
                                        ? goodWithOtherAnimalsHover
                                        : goodWithOtherAnimals
                                    ]}
                                </Box>
                                {errors.goodWithOtherAnimals &&
                                    <ValidationMsg field={'Good with Other Animals'} />}
                            </Box>
                        </Grid>
                    </Grid>

                    <Label>Good With Children Rating: </Label>
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
                                <ErrorBorder border={errors.goodWithChildren && '1px solid red'}>
                                    <StyledRating
                                        name='goodWithChildrenRating'
                                        value={goodWithChildren}
                                        onChange={this.handleGoodWithChildrenChange}
                                        precision={1}
                                        icon={<IoMdPaw fontSize='60' />}
                                        IconContainerComponent={IconContainer}
                                        onChangeActive={(event, hover) => {
                                            this.handleGoodWithChildrenHover(hover);
                                        }}
                                    />
                                </ErrorBorder>
                                <Box ml={2}>
                                    {labels[goodWithChildrenHover !== -1
                                        ? goodWithChildrenHover
                                        : goodWithChildren
                                    ]}
                                </Box>
                                {errors.goodWithChildren &&
                                    <ValidationMsg field={'Good with Children'} />}
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

export default SectionTwo;