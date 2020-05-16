import React, { Component } from 'react';
import Logo from './Logo';
import Links from './Links';
import { StyledContainer, Navigation } from '../../style/dog-styles';

class NavBar extends Component {
    render() {
        return (
            <StyledContainer>
                <Navigation>
                    <Logo />
                    <Links />
                </Navigation>
            </StyledContainer>
        );
    };
};

export default NavBar;