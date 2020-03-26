import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import { IoIosClose } from 'react-icons/io';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { 
    SubText,
    ImageModalStyle,
    CloseModalIcon,
    AlbumImgContainer,
    HeadingSmall
 } from '../../style/dog-styles';

Modal.setAppElement('#root');

const albumStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into it's own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));


class ProfileAlbum extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            albumUrls: this.props.albumUrls
        };
    };

    albumContainer = () => {
        const albumClass = albumStyles();
        const albumUrls = this.state.albumUrls;

        return (
            <React.Fragment>
                <div className={albumClass.root}>
                    <GridList cellHeight={350} className={albumClass.gridList} cols={2.5}>
                        {albumUrls.map((image, index) => (
                            <GridListTile key={index}>
                                <img src={image}
                                    alt='album'
                                    onClick={() => this.handleOpenModal(image)}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </React.Fragment>
        );
    };

    handleOpenModal = image => {
        this.setState({
            modalIsOpen: true,
            albumImage: image
        });
    };

    handleAfterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    };

    handleCloseModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const {
            name,
            albumImage
        } = this.state;

        return (
            <Container>
                <div>
                    <br />
                    <HeadingSmall>{name}'s Album Images</HeadingSmall>
                    <SubText>Click or Tap to Enlarge</SubText>
                    <this.albumContainer />
                    <br />
                </div>
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.handleAfterOpenModal}
                        onRequestClose={this.handleCloseModal}
                        style={ImageModalStyle}
                        contentLabel='Album Image Modal'
                    >
                        <h2 ref={subtitle => this.subtitle = subtitle}> </h2>
                        <CloseModalIcon>
                            <IoIosClose
                                onClick={this.handleCloseModal}
                                size={30}
                            />
                        </CloseModalIcon>
                        <AlbumImgContainer>
                            <Image
                                src={albumImage}
                                alt='Album Pic'
                                thumbnail
                                fluid
                            />
                        </AlbumImgContainer>
                    </Modal>
                </div>
            </Container>
        );
    };
};

export default ProfileAlbum;