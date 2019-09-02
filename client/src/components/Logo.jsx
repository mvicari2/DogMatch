import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../logo.svg';

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href='#'>
                <img src={logo} width='40' height='40' alt='Doggo Dates' />
            </Wrapper>
        )
    }
}

export default Logo