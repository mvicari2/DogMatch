import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveMenu from 'react-responsive-navbar';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';
import {
    Collapse,
    List,
    Item
} from '../../style/dog-styles';

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