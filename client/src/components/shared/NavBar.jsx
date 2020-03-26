import React, { Component } from 'react';
import Logo from './Logo';
import Links from './Links';
import { Container, Navigation } from '../../style/dog-styles';

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Navigation>
                    <Logo />
                    <Links />
                </Navigation>
            </Container>
        );
    };
};

export default NavBar;