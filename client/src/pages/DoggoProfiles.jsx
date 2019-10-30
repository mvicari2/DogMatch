import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import 'react-table/react-table.css';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import {
    ProfilesTable,
    ProfilesCards,
    ProfilesFilter,
    Loading
} from '../components';

const Wrapper = styled.div`
    padding: 0 5px 0 5px;
    text-align: center;
`;

class DoggoProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            originalProfiles: [],
            showTable: false,
            isFiltered: false
        };
    };
    
    handleFilterProfiles = async params => {
        var { originalProfiles } = this.state;
        var profiles = originalProfiles;

        // filter using age range
        if (params.ageRange.low !== 0 || params.ageRange.high !== 30) {
            if (params.ageRange.low > params.ageRange.high) {
                alert('Age Range does not compute, starting age must be less than ending age.');
                return;
            } else {
                profiles = profiles.filter(profile => {
                    return profile.age >= params.ageRange.low
                        && profile.age <= params.ageRange.high;
                });
            };
        };
        
        // filter by gender
        if (params.genderFilter === 'male') {
            profiles = profiles.filter(profile => {
                return profile.gender === 'male';
            });
        } else if (params.genderFilter === 'female') {
            profiles = profiles.filter(profile => {
                return profile.gender === 'female';
            });
        };

        // ordering by (name || breed || age || weight)
        switch (params.orderBy) {
            case '1': // Order By Age                
                if (params.ageOrder === '1') {
                    profiles = profiles.sort((a, b) => {
                        return a.age - b.age;
                    });
                } else if (params.ageOrder === '2') {
                    profiles = profiles.sort((a, b) => {
                        return b.age - a.age;
                    });
                };
                break;

            case '2': // Order By Name                
                if (params.nameOrder === '1') {
                    profiles = profiles.sort((profileA, profileB) => {
                        var aName = profileA.name.toUpperCase();
                        var bName = profileB.name.toUpperCase();

                        return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
                    });
                } else if (params.nameOrder === '2') {
                    profiles = profiles.sort((profileA, profileB) => {
                        var aName = profileA.name.toUpperCase();
                        var bName = profileB.name.toUpperCase();

                        return (bName < aName) ? -1 : (bName > aName) ? 1 : 0;
                    });
                };
                break;

            case '3': // Order By Breed                
                if (params.breedOrder === '1') {
                    profiles = profiles.sort((profileA, profileB) => {
                        var aBreed = profileA.breed.toUpperCase();
                        var bBreed = profileB.breed.toUpperCase();

                        return (aBreed < bBreed) ? -1 : (aBreed > bBreed) ? 1 : 0;
                    });
                } else if (params.breedOrder === '2') {
                    profiles = profiles.sort((profileA, profileB) => {
                        var aBreed = profileA.breed.toUpperCase();
                        var bBreed = profileB.breed.toUpperCase();

                        return (aBreed > bBreed) ? -1 : (aBreed < bBreed) ? 1 : 0;
                    });
                };
                break;

            case '4': // Order By Weight
                if (params.weightOrder === '1') {
                    profiles = profiles.sort((a, b) => {
                        return a.weight - b.weight;
                    });
                } else if (params.weightOrder === '2') {
                    profiles = profiles.sort((a, b) => {
                        return b.weight - a.weight;
                    });
                };
                break;
            default:
                console.log('no profile ordering selected');
        };

        const profilesLength = profiles.length;
        var isFiltered = false;

        if (params.ageRange.low !== 0 || params.ageRange.high !== 30
            || params.orderBy !== '0' || params.genderFilter !== '0') {
            isFiltered = true;
        };
        
        this.setState({
            profiles,
            profilesLength,
            isFiltered
        });
    };

    handleClearFilter = async e => {
        const { originalProfiles } = this.state;
        const profilesLength = originalProfiles.length;

        // set back to intial profiles list and length on clear filter
        this.setState({
            profiles: originalProfiles,
            profilesLength,
            isFiltered: false
        });
    };

    handleSearchProfiles = async search => {        
        const { originalProfiles } = this.state;
        var profiles = originalProfiles;        

        // prepare search string
        search.searchString = search.searchString.trim();
        search.searchString = search.searchString.toUpperCase();       

        // if search string contains any whitespace (after trim) then split it into new array
        var searchStrArray = [];
        if (/\s/.test(search.searchString)) {
            searchStrArray = search.searchString.split(' ');            
            searchStrArray = searchStrArray.map(str => // rm special chars from strings
                str.replace(/[^0-9a-zA-Z\s]|[^0-9a-zA-Z\s]/g, '')
            );
        } else { // remove special characters for single string
            search.searchString = search.searchString.replace(/[^0-9a-zA-Z]|[^0-9a-zA-Z]/g, '');
        };

        // filter profiles using search string (or search string array)
        profiles = profiles.filter(profile => {
            var name = profile.name.toUpperCase();
            const breed = profile.breed.toUpperCase();
            var color = profile.color.join(' ');
            color = color.toUpperCase();            
            var aboutDoggo = '';
            var favoriteMemory = '';
            var favoriteFoods = '';
            var favoriteToy = '';
            var favoriteSleepLocation = '';
            var favoriteWalkLocation = '';
            
            // set biography fields (only if the bio object exists and was requested via checkbox)
            if (profile.biography !== undefined && 
                    profile.biography !== null && 
                    search.includeBio) {
                aboutDoggo = profile.biography.aboutDoggo.toUpperCase();
                favoriteMemory = profile.biography.favoriteMemory.toUpperCase();
                favoriteFoods = profile.biography.favoriteFoods.toUpperCase();
                favoriteToy = profile.biography.favoriteToy.toUpperCase();
                favoriteSleepLocation = profile.biography.favoriteSleepLocation.toUpperCase();
                favoriteWalkLocation = profile.biography.favoriteWalkLocation.toUpperCase();
            }; 

            // return for single search string
            if (searchStrArray.length < 1) {
                return name.includes(search.searchString) ||
                    breed.includes(search.searchString) ||
                    color.includes(search.searchString) ||
                    aboutDoggo.includes(search.searchString) ||
                    favoriteMemory.includes(search.searchString) ||
                    favoriteFoods.includes(search.searchString) ||
                    favoriteToy.includes(search.searchString) ||
                    favoriteSleepLocation.includes(search.searchString) ||
                    favoriteWalkLocation.includes(search.searchString);  
            } else{ // return for search string array
                return searchStrArray.some(subStr => 
                    name.includes(subStr) || 
                    breed.includes(subStr) ||
                    color.includes(subStr) ||
                    aboutDoggo.includes(subStr) ||
                    favoriteMemory.includes(subStr) ||
                    favoriteFoods.includes(subStr) ||
                    favoriteToy.includes(subStr) ||
                    favoriteSleepLocation.includes(subStr) ||
                    favoriteWalkLocation.includes(subStr)
                );
            };                 
        });

        const profilesLength = profiles.length;
        this.setState({ profiles, profilesLength });
    };

    handleSwitchProfiles = async () => {
        this.setState({ showTable: !this.state.showTable })
    };

    clearSearch = async () => {
        const { originalProfiles } = this.state;
        const profilesLength = originalProfiles.length;

        // revert to intial profiles list and length on clear search
        this.setState({
            profiles: originalProfiles,
            profilesLength
        });
    };

    componentDidMount = async () => {
        this.setState({ isLoading: true });

        await api.getAllDoggos().then(profiles => {
            const profilesList = profiles.data.data;
            const profilesLength = profilesList.length;

            this.setState({
                profiles: profilesList,
                originalProfiles: profilesList,
                profilesLength,
                isLoading: false,
            });
        });
    };

    render() {
        const {
            profiles,
            profilesLength,
            isLoading,
            showTable,
            isFiltered
        } = this.state;

        return (
            <Wrapper>
                <Typography gutterBottom variant='h2'>
                    Doggo Profiles
                </Typography>
                {isLoading
                    ? <Wrapper>
                        <Loading />
                    </Wrapper>
                    : <Wrapper>
                        <ProfilesFilter
                            handleFilter={this.handleFilterProfiles}
                            clearFilter={this.handleClearFilter}
                            switchProfiles={this.handleSwitchProfiles}
                            isFiltered={isFiltered}
                            showTable={showTable}
                            searchProfiles={this.handleSearchProfiles}
                            clearSearch={this.clearSearch}
                        />
                        {profilesLength} profiles
                                <br /><br />
                        {showTable
                            ? <ProfilesTable profiles={profiles} />
                            : <ProfilesCards
                                profiles={profiles}
                                history={this.props.history}
                            />}                        
                    </Wrapper>}                
            </Wrapper>
        );
    };
};

export default DoggoProfiles;