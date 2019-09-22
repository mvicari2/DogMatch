import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Text = styled.div`
    display: block;    
    text-align: center;
`;

const Label = styled.h3`
    margin: 5px;
    color: #616b61;
    text-align: center;
`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component='div'
            role='tabpanel'
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Text>
                <Box p={3}>{children}</Box>
            </Text>
        </Typography>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
};

const biographyStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

class BiographySection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            biography: this.props.biography,
            value: 0
        };
    };

    handleBiographyChange = async (event, newValue) => {
        const value = newValue;
        this.setState({ value });
    };

    biographyTabs = () => {
        const classes = biographyStyle();
        const {
            value,
            biography
        } = this.state;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <AppBar position='static' color='default'>
                        <Label>Biography</Label>
                        <Tabs
                            value={value}
                            onChange={this.handleBiographyChange}
                            orientation='horizontal'
                            indicatorColor='primary'
                            textColor='primary'
                            variant='scrollable'
                            scrollButtons='auto'
                            aria-label='scrollable auto tabs example'
                        >
                            <Tab label='About' {...a11yProps(0)} />
                            <Tab label='Favorite Memory' {...a11yProps(1)} />
                            <Tab label='Favorite Food' {...a11yProps(2)} />
                            <Tab label='Favortie Toy' {...a11yProps(3)} />
                            <Tab label='Favorite Sleep Location' {...a11yProps(4)} />
                            <Tab label='Favorite Walk Location' {...a11yProps(5)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        {biography.aboutDoggo}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {biography.favoriteMemory}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {biography.favoriteFoods}
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        {biography.favoriteToy}
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        {biography.favoriteSleepLocation}
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        {biography.favoriteWalkLocation}
                    </TabPanel>
                </div>
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                <this.biographyTabs />
            </React.Fragment>
        );
    };
};

export default BiographySection;