import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

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

const InputTextLarge = styled.textarea.attrs({
    className: 'form-control col-lg-10',
})`    
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

const Label = styled.label`
    margin: 5px;
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

class BiographyProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            aboutDoggo: '',
            favoriteMemory: '',
            favoriteFoods: '',
            favoriteToy: '',
            favoriteSleepLocation: '',
            favoriteWalkLocation: ''
        };
    };

    handleAboutDoggo = async e => {
        const aboutDoggo = e.target.value;
        this.setState({ aboutDoggo });
    };

    handleFavoriteMemory = async e => {
        const favoriteMemory = e.target.value;
        this.setState({ favoriteMemory });
    };

    handleFavoriteFoods = async e => {
        const favoriteFoods = e.target.value;
        this.setState({ favoriteFoods });
    };

    handleFavoriteToy = async e => {
        const favoriteToy = e.target.value;
        this.setState({ favoriteToy });
    };

    handleFavoriteSleepLocation = async e => {
        const favoriteSleepLocation = e.target.value;
        this.setState({ favoriteSleepLocation });
    };

    handleFavoriteWalkLocation = async e => {
        const favoriteWalkLocation = e.target.value;
        this.setState({ favoriteWalkLocation });
    };

    handleBackToTemperament = async () => {
        this.props.history.push(`/doggos/temperament/${this.state.id}`);
    };

    componentDidMount = async () => {
        const { id } = this.state;
        const doggo = await api.getDoggoById(id);
        const name = doggo.data.data.name;

        // handle situations where no biography data has been posted yet (first time)
        if (doggo.data.data.biography === undefined) {
            this.setState({// if initial 
                name
            });
        } else {// if updating 
            const biography = doggo.data.data.biography;

            this.setState({
                name,
                aboutDoggo: biography.aboutDoggo,
                favoriteMemory: biography.favoriteMemory,
                favoriteFoods: biography.favoriteFoods,
                favoriteToy: biography.favoriteToy,
                favoriteSleepLocation: biography.favoriteSleepLocation,
                favoriteWalkLocation: biography.favoriteWalkLocation,
            });
        };
    };

    handlePostBiography = async () => {
        const {
            id,
            aboutDoggo,
            favoriteMemory,
            favoriteFoods,
            favoriteToy,
            favoriteSleepLocation,
            favoriteWalkLocation
        } = this.state;

        const payload = {
            id,
            aboutDoggo,
            favoriteMemory,
            favoriteFoods,
            favoriteToy,
            favoriteSleepLocation,
            favoriteWalkLocation
        };

        await api.updateBiographyById(id, payload).then(res => {
            this.props.history.push(`/doggos/album/${id}`);
        });

    };

    render() {
        const {
            name,
            aboutDoggo,
            favoriteMemory,
            favoriteFoods,
            favoriteToy,
            favoriteSleepLocation,
            favoriteWalkLocation
        } = this.state;

        return (
            <Container>
                <Title>{name}'s Biography Profile</Title>
                <Wrapper>
                    <Label>Tell us all about {name} (biography): </Label>
                    <InputTextLarge
                        type='text'
                        rows='5'
                        value={aboutDoggo}
                        onChange={this.handleAboutDoggo}
                    />
                    <Label>What is {name}'s Favorite Memory?</Label>
                    <InputTextLarge
                        type='text'
                        rows='3'
                        value={favoriteMemory}
                        onChange={this.handleFavoriteMemory}
                    />
                    <Label>{name}'s Favorite Foods?</Label>
                    <InputTextLarge
                        type='text'
                        rows='2'
                        value={favoriteFoods}
                        onChange={this.handleFavoriteFoods}
                    />
                    <Label>{name}'s Favorite Toy?</Label>
                    <InputTextLarge
                        type='text'
                        rows='2'
                        value={favoriteToy}
                        onChange={this.handleFavoriteToy}
                    />
                    <Label>{name}'s Favorite Place to Sleep?</Label>
                    <InputTextLarge
                        type='text'
                        rows='2'
                        value={favoriteSleepLocation}
                        onChange={this.handleFavoriteSleepLocation}
                    />
                    <Label>{name}'s Favorite Place to go on a Walk?</Label>
                    <InputTextLarge
                        type='text'
                        rows='2'
                        value={favoriteWalkLocation}
                        onChange={this.handleFavoriteWalkLocation}
                    />
                    <br />
                    <Button onClick={this.handleBackToTemperament}>Back to Temperament</Button>
                    <Button onClick={this.handlePostBiography}>Save Biography</Button>
                </Wrapper>
            </Container>
        );
    };
};

export default BiographyProfile;