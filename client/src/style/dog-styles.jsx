// Master style sheet for Styled components and other css classes/components

import styled, { css, keyframes } from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

// Import react-bootstrap components to wrap in Styled Components
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


// React-Bootstrap
export const BootstrapImage = styled(Image)``;
export const BootstrapContainer = styled(Container)``;
export const BootstrapRow = styled(Row)``;
export const BootstrapCol = styled(Col)``;
export const BootstrapForm = styled(Form)``;
export const BootstrapTable = styled(Table)``;



// Wrappers, divs, cols, rows, and containers 
export const Wrapper = styled.div.attrs({
    className: 'form-group col-lg-10',
})`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

export const ImageWrapper = styled.div`    
    max-width: 250px;
    max-height: 170px;
    width: auto;
    height: auto;
    text-align: center !important;
`;

export const CloseModalWrapper = styled.div`    
    margin: 5px;   
    text-align: right !important; 
`;

export const MatchesWrapper = styled.div`   
    width: auto;
    height: auto;
    text-align: center !important;
`;

export const MatchesLeftCol = styled.div.attrs({
    className: 'form-group col justify-content-center',
})`
    margin-right: -20px;
    padding: -10px -10px -10px -10px
    width: 30%
`;

export const MatchesRightCol = styled.div.attrs({
    className: 'form-group col justify-content-center',
})`
    max-width: 100%;
    text-align: left;
`;

export const MatchesRow = styled.div.attrs({
    className: 'form-group row justify-content-center',
})`
    max-width: 100%;
`;

export const Radios = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center !important;
`;

export const WrapperCol = styled.div.attrs({
    className: 'form-group col-sm-8',
})`    
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

export const WrapperDiv = styled.div`
    padding: 0 5px 0 5px;
    text-align: center;
`;

export const AlbumImgContainer = styled.div`    
    max-width: 800px;
    max-height: 800px;
    width: auto;
    height: auto;
    text-align: center !important;
`;

export const TitleWrapper = styled.div`
    text-align: center;
`;

export const PaddedWrapper = styled.div`
    padding: 0 40px 40px 40px;
`;

export const ProfileLink = styled.div`
    color: green;
    cursor: pointer;
`;

export const UpdateLink = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`;

export const DeleteLink = styled.div`
    color: #ff0000;
    cursor: pointer;
`;

export const FilterRow = styled.div.attrs({
    className: 'form-group row justify-content-center',
})`
    max-width: 100%;
    margin-top: -20px;
`;

export const InputWrapper = styled.span`
    display: block;
    margin-right: 10px;
    margin-top: 15px;    
`;

export const StyledContainer = styled.div.attrs({
    className: 'container',    
})`
    min-height: 100%;
    padding: 0px;
    min-width: 100%;
`;

export const ImageContainer = styled.div`    
    max-width: 450px;
    max-height: 90vh;
    width: auto;
    height: auto;
    text-align: center !important;
`;

export const ColContainer = styled.div`
    width: auto;
    height: auto;
    text-align: center !important;
`;

export const DropZoneContainer = styled.div`
    height: 200px;
    border: 2px dashed #2c67d8;
    padding: 30px;

    ${props => (props.isDragActive) && css`
        border-color: green;
    `};
`;

export const ErrorBorder = styled.div`
    border: ${props => props.border || '1px solid #fffff'} !important;
`;



// Buttons and Clicky Icons
export const MatchButton = styled.button.attrs({
    className: `btn btn-outline-danger btn-sm`,
})`
    margin: 15px 15px 15px 5px;
    display: inline;
`;

export const ViewProfileButton = styled.button.attrs({
    className: `btn btn-outline-primary btn-sm`,
})`
    margin: 15px 15px 15px 5px;
    display: inline;
`;

export const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

export const DangerButton = styled.button.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`;

export const BirthdayButton = styled.button.attrs({
    className: `btn btn-outline-primary btn-sm`,
})`
    margin: 15px 15px 15px 5px;
`;

export const SmallButton = styled.button.attrs({
    className: `btn btn-outline-primary btn-sm`,
})`
    margin: 15px 15px 15px 5px;
    display: inline;
`;

export const SmallDangerButton = styled.button.attrs({
    className: `btn btn-outline-danger btn-sm`,
})`
    margin: 15px 15px 15px 5px;
    display: inline;
`;

export const CloseModalIcon = styled.button`    
    border: 0;
    background-color: white;
    margin: 5px;   
    text-align: right !important; 
`;

export const SmallWarningButton = styled.a.attrs({
    className: `btn btn-outline-warning btn-sm`,
})`
    margin: 15px 15px 15px 5px;
`;






// Cards and alerts
export const Card = styled.div.attrs({
    className: `card`,
})`
    display: flex;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;

export const CardBody = styled.div.attrs({
    className: `card-body`,
})``;

export const DangerAlert = styled.div.attrs({
    className: `alert alert-danger`
})``;





// Images
export const ImageMedium = styled.img`    
    max-width: 350px;
    max-height: 350px;
    width: auto;
    height: auto;
    text-align: center !important;
`;

export const MatchProfileImage = styled.img` 
    position: relative;
    float: center;
    width:  auto;
    height: 170px;
    background-position: 50% 50%;
    background-repeat:   no-repeat;
    background-size:     cover;
`;

export const PCardImage = styled.img`    
    position: relative;
    float: center;
    width:  auto;
    height: 300px;
    background-position: 50% 50%;
    background-repeat:   no-repeat;
    background-size:     cover;
`;


// Navbar
export const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``;

export const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``;

export const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``;

export const Navigation = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 10px;    
    margin-left: -15px;
    margin-right: -15px;
    margin-top: -5px;
    padding: 0px;
    min-width: 100%;
    background: -webkit-gradient( linear, left bottom, left top, color-stop(0.09, rgb(59,63,65)), color-stop(0.55, rgb(72,76,77)), color-stop(0.78, rgb(75,77,77)) );
    background: -moz-linear-gradient( center bottom, rgb(59,63,65) 9%, rgb(72,76,77) 55%, rgb(75,77,77) 78% );
    background: -o-linear-gradient( center bottom, rgb(59,63,65) 9%, rgb(72,76,77) 55%, rgb(75,77,77) 78% );
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 0 5px rgba(0, 0, 0, 0.1) inset;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    border-right: 1px solid rgba(0,0,0,0.2);
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
`;

export const LogoWrapper = styled.a.attrs({
    className: 'navbar-brand',
})``;




// Text, Heading, and Labels
export const Label = styled.label`
    margin: 5px;
`;

export const ErrorLabel = styled.label`
    margin: 5px;
    color: #ff0000 !important;
`;

export const SearchLabel = styled.label`
    margin: 5px;
    margin-top: 15px
    display: inline;
`;

export const InputTextLarge = styled.textarea.attrs({
    className: 'form-control col-lg-10',
})`    
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

export const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    border: ${props => props.border || '1px solid #ccc'} !important;
`;

export const Text = styled.div`
    display: block;    
    text-align: center;
`;

export const SubText = styled.div`
    margin: 5px;    
    text-align: center;
`;

export const HeadingMedium = styled.h3`
    margin: 5px;
    color: #616b61;
    text-align: center;
`;

export const HeadingSmall = styled.h5`
    margin: 5px;
    color: #616b61;
    text-align: center;
`;





// loading animation styles/animation/keyframes
export const BounceAnimation = keyframes`
    0% { margin-bottom: 0; }
    50% { margin-bottom: 15px }
    100% { margin-bottom: 0 }
`;

export const DotWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

export const Dot = styled.div`
    text-align: center;
    background-color: black;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin: 0 10px;
    /* Animation */
    animation: ${BounceAnimation} 0.5s linear infinite;
    animation-delay: ${props => props.delay};
`;



// css classes for modals pop-up
export const matchesModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '100%',
        maxWidth: '100%',
        width: '85%'
    }
};

export const ImageModalStyle = {
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

export const BirthdayStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export const FooterStyle = {
    backgroundColor: '#003366',
    borderTop: '1px solid #E7E7E7',
    textAlign: 'center',
    padding: '0px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    height: '20px',
    width: '100%',
    fontSize: 'small',
    color: 'white'
};

export const Block = {
    display: 'block',
    padding: '0px',
    height: '20px',
    width: '100%',
};

export const FilterStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxHeight: '90%'
    }
};





// Material-UI component styles (makeStyles/useStyles)
export const AlbumStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        flexWrap: 'nowrap !important',
        // Promote the list into it's own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)'
    }
}));

export const CardStyles = makeStyles(theme => ({
    root: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: 300,
        backgroundColor: '#f2f4f5',
        maxHeight: 600,
        height: 'auto',
        margin: '10px 0 10px 0'
    },
    cardActions: {
        textAlign: 'center'
    }
}));

export const StepperStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        textAlign: 'center'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
}));

export const UpdateNavStyles = makeStyles({
    root: {
        height: 80
    },
});

export const StyledRating = withStyles({
    iconFilled: {
        color: '#00468b',
    },
    iconHover: {
        color: '#00468b',
    },
})(Rating);