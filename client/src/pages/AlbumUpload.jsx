import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import config from '../config/config';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { AlbumDropContainer } from '../components';

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

const RemoveImgButton = styled.a.attrs({
    className: `btn btn-outline-warning btn-sm`,
})`
    margin: 15px 15px 15px 5px;
`;

const Image = styled.img`    
    max-width: 350px;
    max-height: 350px;
    width: auto;
    height: auto;
    text-align: center !important;
`;

class AlbumUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            albumFileNames: [],
            albumFiles: [],
            albumUrls: []
        };
    };

    handleBackToBiography = async () => {
        this.props.history.push(`/doggos/biography/${this.state.id}`);
    };

    handleAlbumFiles = async files => {
        const {
            albumFiles,
            albumUrls
        } = this.state;

        // add images to album file array
        files.forEach(file => {
            albumFiles.push(file);
        });

        // set blobs array for previewing album
        files.forEach(file => {
            albumUrls.push(URL.createObjectURL(file));
        });

        this.setState({
            albumFiles,
            albumUrls
        });
    };

    handleRemoveAll = async () => {
        this.setState({
            albumFileNames: [],
            albumFiles: [],
            albumUrls: []
        });
    };

    handleRemoveImage = async i => {
        var {
            albumFileNames,
            albumUrls,
            albumFiles
        } = this.state;

        // count files from component mount that are still in state
        const originalFileCount = albumFileNames.length;

        // highest array index number of original files from component mount
        const originalFileIndex = originalFileCount - 1;

        // if image already saved then remove filename from filename array
        // new images (since mount) not yet in filename array
        if (originalFileIndex >= i) {
            albumFileNames = albumFileNames.filter((value, index, arr) => {
                return index !== i;
            });
        } else { // if image added since component mount then remove new image from state
            const removeIndex = i - originalFileCount;
            albumFiles = albumFiles.filter((value, index, arr) => {
                return index !== removeIndex;
            });
        };

        // remove album image preview url from array
        albumUrls = albumUrls.filter((value, index, arr) => {
            return index !== i;
        });

        this.setState({
            albumFileNames,
            albumFiles,
            albumUrls
        });
    };

    componentDidMount = async () => {
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);
        const albumFileNames = doggo.data.data.albumFileNames;
        var albumPicPaths = [];

        // use filenames to create URL array 
        if (albumFileNames !== null || albumFileNames.length > 0) {
            albumFileNames.forEach(filename => {
                albumPicPaths.push(config.albumPicDir + filename);
            });
        };

        this.setState({
            name: doggo.data.data.name,
            albumFileNames: doggo.data.data.albumFileNames,
            albumUrls: albumPicPaths
        });
    };

    handlePostAlbum = async () => {
        const {
            id,
            albumFiles,
            albumFileNames
        } = this.state;

        // post Album pictures, return filename array
        if (albumFiles.length > 0) {
            const data = new FormData();

            albumFiles.forEach(file => {
                data.append('albumFiles', file);
            });

            await axios({
                method: 'post',
                url: `${config.albumApi}`,
                data: data,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            }).then(response => {
                response.data.forEach(res => {
                    albumFileNames.push(res.filename);
                });

                this.setState({ albumFileNames });
            });
        };

        const payload = {
            id,
            albumFileNames
        };

        await api.updateAlbumFileNamesById(id, payload).then(res => {
            this.props.history.push(`/doggos/update/${id}`);
        });
    };

    render() {
        const {
            name,
            albumUrls
        } = this.state;

        return (
            <Container>
                <Wrapper>
                    <Typography gutterBottom variant='h3' component='h3'>
                        Upload a Photo Album of 
                        <br />
                        {name}
                    </Typography>
                    <br />
                    <AlbumDropContainer
                        handleAlbumDrop={this.handleAlbumFiles}
                    />

                    {this.state.albumUrls.length > 0 ?
                        <div>
                            <div>
                                <Label>Album Pictures Preview: </Label><br />
                                <RemoveImgButton onClick={this.handleRemoveAll}>
                                    Remove All Images
                                </RemoveImgButton>

                                {albumUrls.map((url, index) =>
                                    <div key={index}>
                                        <p>
                                            <Image src={url} alt='Album Image' />
                                            <RemoveImgButton
                                                onClick={() => this.handleRemoveImage(index)}
                                            >
                                                Remove Image
                                            </RemoveImgButton>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        : null}
                    <br />
                    <Button onClick={this.handleBackToBiography}>Back to Biography</Button>
                    <Button onClick={this.handlePostAlbum}>Save Album & Submit Profile</Button>
                </Wrapper>
            </Container>
        );
    };
};

export default AlbumUpload;