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
            goodWithChildrenHover: sectionTwoData.goodWithChildren
        };
    };

    handleFriendlinessOverallChange = async e => {
        const friendlinessOverall = parseInt(e.target.value);
        this.setState({ friendlinessOverall });
    };

    handleGoodWithPeopleChange = async e => {
        const goodWithPeople = parseInt(e.target.value);
        this.setState({ goodWithPeople });
    };

    handleGoodWithOtherDogsChange = async e => {
        const goodWithOtherDogs = parseInt(e.target.value);
        this.setState({ goodWithOtherDogs });
    };

    handleGoodWithCatsChange = async e => {
        const goodWithCats = parseInt(e.target.value);
        this.setState({ goodWithCats });
    };

    handleGoodWithOtherAnimalsChange = async e => {
        const goodWithOtherAnimals = parseInt(e.target.value);
        this.setState({ goodWithOtherAnimals });
    };

    handleGoodWithChildrenChange = async e => {
        const goodWithChildren = parseInt(e.target.value);
        this.setState({ goodWithChildren });
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
            goodWithChildrenHover
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
                                <Box ml={2}>
                                    {labels[friendlinessOverallHover !== -1
                                        ? friendlinessOverallHover
                                        : friendlinessOverall
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[goodWithPeopleHover !== -1
                                        ? goodWithPeopleHover
                                        : goodWithPeople
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[goodWithOtherDogsHover !== -1
                                        ? goodWithOtherDogsHover
                                        : goodWithOtherDogs
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[goodWithCatsHover !== -1
                                        ? goodWithCatsHover
                                        : goodWithCats
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[goodWithOtherAnimalsHover !== -1
                                        ? goodWithOtherAnimalsHover
                                        : goodWithOtherAnimals
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[goodWithChildrenHover !== -1
                                        ? goodWithChildrenHover
                                        : goodWithChildren
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

export default SectionTwo;