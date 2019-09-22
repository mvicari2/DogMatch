import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Links from './Links';

const Container = styled.div.attrs({
    className: 'container',    
})`
    min-height: 100%;
    padding: 0px;
    min-width: 100%;
`;

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 10px;    
    margin-left: -15px;
    margin-right: -15px;
    margin-top: -5px;
    padding: 0px;
    min-width: 100vh;
    background: -webkit-gradient( linear, left bottom, left top, color-stop(0.09, rgb(59,63,65)), color-stop(0.55, rgb(72,76,77)), color-stop(0.78, rgb(75,77,77)) );
    background: -moz-linear-gradient( center bottom, rgb(59,63,65) 9%, rgb(72,76,77) 55%, rgb(75,77,77) 78% );
    background: -o-linear-gradient( center bottom, rgb(59,63,65) 9%, rgb(72,76,77) 55%, rgb(75,77,77) 78% );
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 0 5px rgba(0, 0, 0, 0.1) inset;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    border-right: 1px solid rgba(0,0,0,0.2);
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
`;

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        );
    };
};

export default NavBar;