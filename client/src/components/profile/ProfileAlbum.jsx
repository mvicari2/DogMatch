import React, { Component } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import { IoIosClose } from 'react-icons/io';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const imageModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '100%',
        maxWidth: '100%'
    }
};

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

const Label = styled.h5`
    margin: 5px;
    color: #616b61;
    text-align: center;
`;

const Text = styled.div`
    margin: 5px;    
    text-align: center;
`;

const CloseModalIcon = styled.div`
    margin: 5px;   
    text-align: right; 
`;

const AlbumImgContainer = styled.div`    
    max-width: 800px;
    max-height: 800px;
    width: auto;
    height: auto;
    text-align: center !important;
`;

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
                    <Label>{name}'s Album Images</Label>
                    <Text>Click or Tap to Enlarge</Text>
                    <this.albumContainer />
                    <br />
                </div>
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.handleAfterOpenModal}
                        onRequestClose={this.handleCloseModal}
                        style={imageModalStyle}
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