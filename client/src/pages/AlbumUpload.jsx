import React, { Component } from 'react';
import api from '../api';
import styled, { css } from 'styled-components';
import Container from 'react-bootstrap/Container';
import { Footer } from '../components';
import { FiUpload } from 'react-icons/fi';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import config from '../config/config';

const maxSize = 5242880;

const Title = styled.h1.attrs({
    className: 'h1',
})`
    text-align: center;
`;

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

const DropZoneContainer = styled.div`
    height: 200px;
    border: 2px dashed #2c67d8;
    padding: 30px;

    ${props => (props.isDragActive) && css`
        border-color: green;
    `};
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

    imageDropContainer = () => {
        return (
            <React.Fragment>
                <div>
                    <Label>
                        Select up to 12 images for a photo album.
                        You can add one at a time, or upload all at once using your file explorer.
                    </Label>
                    <br />
                    <Dropzone
                        name={'albumFiles'}
                        onDrop={this.handleOnDrop}
                        accept='image/*'
                        minSize={0}
                        maxSize={maxSize}
                        style={{}}
                    >
                        {({
                            getRootProps,
                            getInputProps,
                            isDragActive,
                            isDragReject,
                            rejectedFiles
                        }) => {
                            const isFileTooLarge =
                                rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                            return (
                                <DropZoneContainer {...getRootProps()}>
                                    <h1><FiUpload /></h1>
                                    <input {...getInputProps()} />
                                    {isDragActive
                                        ? ' Drop it when it\'s hot! '
                                        : ' Drag an image file or click anywhere in the box to upload! '}
                                    {isDragActive && !isDragReject && ' Drop it like it\'s hot! '}
                                    {isDragReject && ' File type not accepted, sorry! '}
                                    {isFileTooLarge && (
                                        <div>File is too large, 5MB max file size.</div>
                                    )}
                                </DropZoneContainer>
                            );
                        }}
                    </Dropzone>
                </div>
            </React.Fragment>
        );
    };

    handleBackToBiography = async () => {
        this.props.history.push(`/doggos/biography/${this.state.id}`);
    };

    handleOnDrop = async files => {
        // add images to album file array
        const albumFiles = this.state.albumFiles;
        files.forEach(file => {
            albumFiles.push(file);
        });

        // set blobs array for previewing album
        const albumUrls = this.state.albumUrls;
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
        var albumFileNames = this.state.albumFileNames;
        var albumUrls = this.state.albumUrls;
        var albumFiles = this.state.albumFiles;

        // count files from component mount that are still in state
        var originalFileCount = albumFileNames.length;

        // highest array index number of original files from component mount
        var originalFileIndex = originalFileCount - 1;

        // if image already saved then remove filename from filename array
        // new images not yet in filename array
        if (originalFileIndex >= i) {
            albumFileNames = albumFileNames.filter((value, index, arr) => {
                return index !== i;
            });
        } else { // if image added since component mount then remove new image from state
            var removeIndex = i - originalFileCount;
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
        // post Album pictures, return filename array
        if (this.state.albumFiles.length > 0) {
            const data = new FormData();
            const albumFiles = this.state.albumFiles;

            albumFiles.forEach(file => {
                data.append('albumFiles', file);
            });

            await axios({
                method: 'post',
                url: `${config.albumApi}`,
                data: data,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            }).then(response => {
                const albumFileNames = this.state.albumFileNames;
                response.data.forEach(res => {
                    albumFileNames.push(res.filename);
                });

                this.setState({ albumFileNames });
            });
        };

        const {
            id,
            albumFileNames
        } = this.state;

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
                <Title>Upload a Photo Album of {name}</Title>
                <Wrapper>
                    <br />
                    <this.imageDropContainer />
                    {this.state.albumUrls.length > 0 ?
                        <div>
                            <div>
                                <Label>Album Pictures Preview: </Label><br />
                                <RemoveImgButton onClick={this.handleRemoveAll}>Remove All Images</RemoveImgButton>
                                {albumUrls.map((url, index) =>
                                    <div key={index}>
                                        <p>
                                            <Image src={url} alt='Album Image' />
                                            <RemoveImgButton onClick={() => this.handleRemoveImage(index)}>Remove Image</RemoveImgButton>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        : null}
                    <br />
                    <Button onClick={this.handleBackToBiography}>Back to Biography</Button>
                    <Button onClick={this.handlePostAlbum}>Save Album & Submit Profile</Button>
                    <Footer />
                </Wrapper>
            </Container>
        );
    };
};

export default AlbumUpload;