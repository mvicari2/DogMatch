import React, { Component } from 'react';

const footerStyle = {
    backgroundColor: '#003366',
    borderTop: '1px solid #E7E7E7',
    textAlign: 'center',
    padding: '0px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    height: '20px',
    width: '100%',
    fontSize: 'small',
    color: 'white'
};

const block = {
  display: 'block',
  padding: '0px',
  height: '20px',
  width: '100%',
};

class Footer extends Component {
    render() {
        return (
            <React.Fragment>            
                <div>
                    <div style={block} />
                    <div style={footerStyle}>
                        Doggo Match v0.6.1 - Created for Doggos &#169; 2019
                    </div>
                </div>  
            </React.Fragment>
        );
    };
};

export default Footer;