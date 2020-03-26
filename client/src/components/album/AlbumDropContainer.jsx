import React, { Component } from 'react';
import { FiUpload } from 'react-icons/fi';
import Dropzone from 'react-dropzone';
import { DropZoneContainer, Label } from '../../style/dog-styles';

const maxSize = 5242880;

class AlbumDropContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {};
    };    

    handleOnDrop = async files => {
        this.props.handleAlbumDrop(files);
    };    

    render() {
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
};

export default AlbumDropContainer;