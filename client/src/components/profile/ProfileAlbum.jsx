import React, { Component } from 'react';
import { IoIosClose } from 'react-icons/io';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from 'react-modal';
import { 
    SubText,
    ImageModalStyle,
    CloseModalIcon,
    AlbumImgContainer,
    HeadingSmall,
    AlbumStyles,
    StyledContainer,
    BootstrapImage
 } from '../../style/dog-styles';

Modal.setAppElement('#root');

class ProfileAlbum extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            albumUrls: this.props.albumUrls
        };
    };

    albumContainer = () => {
        const albumClass = AlbumStyles();
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
            <StyledContainer>
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
                            <BootstrapImage
                                src={albumImage}
                                alt='Album Pic'
                                thumbnail
                                fluid
                            />
                        </AlbumImgContainer>
                    </Modal>
                </div>
            </StyledContainer>
        );
    };
};

export default ProfileAlbum;