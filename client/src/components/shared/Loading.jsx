import React, { Component } from 'react';
import {
    DotWrapper,
    Dot
} from '../../style/dog-styles';

class Loading extends Component {
    render() {
        return (
            <DotWrapper>
                <Dot delay='0s' />
                <Dot delay='.1s' />
                <Dot delay='.2s' />
                <Dot delay='.5s' />
                <Dot delay='.7s' />
            </DotWrapper>
        );
    };
};

export default Loading;