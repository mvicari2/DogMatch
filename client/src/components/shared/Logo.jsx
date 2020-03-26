import React, { Component } from 'react';
import logo from '../../logo.svg';
import { LogoWrapper } from '../../style/dog-styles';

class Logo extends Component {
    render() {
        return (
            <LogoWrapper href='#'>
                <img
                    src={logo}
                    width='40'
                    height='40'
                    alt='Doggo Dates'
                />
            </LogoWrapper>
        );
    };
};

export default Logo;