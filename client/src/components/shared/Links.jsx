import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ResponsiveMenu from 'react-responsive-navbar';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``;

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``;

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``;

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to='#' className='navbar-brand'>
                    Doggo Match
                </Link>

                <ResponsiveMenu
                    menuOpenButton={<IoIosArrowDown color={'white'} />}
                    menuCloseButton={<IoMdClose color={'white'} />}
                    changeMenuOn='500px'
                    largeMenuClassName='large-menu-classname'
                    smallMenuClassName='small-menu-classname'
                    menu={
                        <Collapse>
                            <List>
                                <Item>
                                    <Link to='/' className='nav-link'>
                                        Profiles
                                    </Link>
                                </Item>                           
                                <Item>
                                    <Link to='/doggos/create' className='nav-link'>
                                        Add Profile
                                    </Link>
                                </Item>
                            </List>
                        </Collapse>
                    }
                />
            </React.Fragment>
        );
    };
};

export default Links;