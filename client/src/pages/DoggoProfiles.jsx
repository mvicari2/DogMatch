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

    handleSwitchProfiles = async () => {
        this.setState({ showTable: !this.state.showTable })
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
                <Typography gutterBottom variant="h2">
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