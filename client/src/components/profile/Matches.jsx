import React, { Component } from 'react';
import api from '../../api';
import Modal from 'react-modal';
import 'typeface-roboto';
import { IoIosClose } from 'react-icons/io';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import config from '../../config/config';
import {    
    Wrapper,
    MatchButton,
    ImageWrapper,
    CloseModalIcon,
    CloseModalWrapper,
    MatchesWrapper,
    Card,
    CardBody,
    MatchesRow,
    MatchesLeftCol,
    MatchesRightCol,
    ViewProfileButton,
    MatchProfileImage,
    matchesModalStyle,
} from '../../style/dog-styles';

Modal.setAppElement('#root');

class Matches extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            name: this.props.name,
            modalIsOpen: false,
            matches: [],
            matchesLength: 0,
            isLoading: false
        };
    };

    handleGetMatches = async () => {
        this.setState({ isLoading: true });

        const { id } = this.state;

        await api.getMatchesById(id).then(matches => {
            const doggoMatches = matches.data.data;
            const matchesLength = doggoMatches.length;

            this.setState({
                matches: doggoMatches,
                matchesLength,
                modalIsOpen: true,
                isLoading: false,
                matchesEmpty: matches.length < 1
                    ? true
                    : false
            });
        }).catch(err => console.log(err));
    };

    handleAfterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    };

    handleCloseModal = () => {
        this.setState({ modalIsOpen: false });
    };

    handleViewProfile = async id => {
        this.setState({ modalIsOpen: false });
        window.location.href = `/doggos/profile/${id}`;
    };

    render() {
        const { name, matches } = this.state;

        return (
            <React.Fragment>

                <MatchButton onClick={this.handleGetMatches}>
                    Get Doggo Matches
                </MatchButton>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.handleAfterOpenModal}
                    onRequestClose={this.handleCloseModal}
                    style={matchesModalStyle}
                    contentLabel='Doggo Matches Modal'
                >
                    <h5 ref={subtitle => this.subtitle = subtitle}> </h5>

                    <CloseModalWrapper>
                        <CloseModalIcon>
                            <IoIosClose
                                onClick={this.handleCloseModal}
                                size={30}
                            />
                        </CloseModalIcon>
                    </CloseModalWrapper>
                    <Wrapper>
                        <Typography gutterBottom variant='h4' component='h4'>
                            Top Ten Matches for {name}
                        </Typography>
                        <MatchesWrapper>
                            {matches !== null && matches !== []
                                ? matches.map((match, index) =>
                                    <Box
                                        key={index}
                                        component='div'
                                        p={1}
                                        m={1}
                                    >
                                        <Card>
                                            <CardBody>
                                                <MatchesRow>
                                                    <MatchesLeftCol>
                                                        <ImageWrapper>
                                                            <MatchProfileImage
                                                                src={config.profilePicDir + match.fileName}
                                                                alt='Profile Pic'
                                                            />
                                                        </ImageWrapper>
                                                    </MatchesLeftCol>
                                                    <MatchesRightCol>
                                                        <Typography gutterBottom variant='h5' component='h5'>
                                                            {index + 1}. {match.name}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom variant='h5'
                                                            color='textSecondary'
                                                        >
                                                            Breed: {match.breed}
                                                            <br />
                                                            <ViewProfileButton
                                                                onClick={() => this.handleViewProfile(match._id)}
                                                            >
                                                                View Profile
                                                            </ViewProfileButton>
                                                        </Typography>
                                                    </MatchesRightCol>
                                                </MatchesRow>
                                            </CardBody>
                                        </Card>
                                    </Box>
                                )
                                : <Typography gutterBottom variant='h5' component='h5'>
                                    No Doggo Matches for {name}.
                                    <br />
                                    Please make sure you've complete the temperament
                                    and personality profile for {name}. We cannot match
                                    doggos without this information.
                                </Typography>}
                        </MatchesWrapper>
                    </Wrapper>
                </Modal>
            </React.Fragment>
        );
    };
};

export default Matches;