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
            smellRatingHover: sectionSixData.smellRating
        };
    };

    handleIsPickyEaterChange = async e => {
        const isPickyEater = parseInt(e.target.value);
        this.setState({ isPickyEater });
    };

    handleSheddingChange = async e => {
        const shedding = parseInt(e.target.value);
        this.setState({ shedding });
    };

    handleBarkingChange = async e => {
        const barking = parseInt(e.target.value);
        this.setState({ barking });
    };

    handleSmellRatingChange = async e => {
        const smellRating = parseInt(e.target.value);
        this.setState({ smellRating });
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
                                <Box ml={2}>
                                    {labels[isPickyEaterHover !== -1
                                        ? isPickyEaterHover
                                        : isPickyEater
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[sheddingHover !== -1
                                        ? sheddingHover
                                        : shedding
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[barkingHover !== -1
                                        ? barkingHover
                                        : barking
                                    ]}
                                </Box>
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
                                <Box ml={2}>
                                    {labels[smellRatingHover !== -1
                                        ? smellRatingHover
                                        : smellRating
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

export default SectionSix;