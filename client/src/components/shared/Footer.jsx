import React, { Component } from 'react';
import { FooterStyle, Block } from '../../style/dog-styles';

class Footer extends Component {
    render() {
        return (
            <React.Fragment>            
                <div>
                    <div style={Block} />
                    <div style={FooterStyle}>
                        Doggo Match v0.6.1 - Created for Doggos &#169; 2019
                    </div>
                </div>  
            </React.Fragment>
        );
    };
};

export default Footer;