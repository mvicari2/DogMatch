import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import 'react-infinite-calendar/styles.css';
import Container from 'react-bootstrap/Container';
import { FiUpload } from 'react-icons/fi';
import Dropzone from 'react-dropzone';

const Label = styled.label`
    margin: 5px;
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

const DropZoneContainer = styled.div`
    height: 200px;
    border: 2px dashed #2c67d8;
    padding: 30px;

    ${props => (props.isDragActive) && css`
        border-color: green;
    `};
`;

class ProfileImage extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            profilePicUrl: this.props.profilePicUrl
        };
    };

    handleOnDrop = async e => {
        const profilePicture = e;
        const profilePicPreview = e[0];
        if (profilePicture.length > 0) {
            this.setState({
                profilePicture,
                profilePicUrl: URL.createObjectURL(profilePicPreview)
            });
        };
        this.props.profilePicture(profilePicture);
    };

    handleRemoveImage = async e => {
        const profilePicture = null;

        this.setState({
            profilePicture,
            profilePicUrl: ''
        });        
        this.props.profilePicture(profilePicture);
    };

    render() {
        const { profilePicUrl } = this.state;
        const maxSize = 5242880; //5mb max image size for profile picture
        
        return (
            <Container>
                {profilePicUrl != null
                    && profilePicUrl.length > 0
                    ? <div>
                        <div>
                            <Label>Profile Picture Preview: </Label><br />
                            <Image src={profilePicUrl} alt='profile' />
                        </div>
                        <RemoveImgButton onClick={this.handleRemoveImage}>
                            Remove Image
                        </RemoveImgButton>
                    </div>
                    : <div>
                        <Label>Upload Profile Picture: </Label> <br />
                        <Dropzone
                            name={'profilePicture'}
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
                    </div>}
            </Container>
        );
    };
};

export default ProfileImage;