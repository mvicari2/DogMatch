import React from 'react';
import api from '../../api'
import styled from 'styled-components';
import 'react-table/react-table.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import config from '../../config/config';
import Box from '@material-ui/core/Box';
import 'typeface-roboto';

const cardStyles = makeStyles(theme => ({
    root: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: 300,
        backgroundColor: '#f2f4f5',
        maxHeight: 600,
        height: 'auto',
        margin: '10px 0 10px 0'
    },
    cardActions: {
        textAlign: 'center'
    }
}));

const Image = styled.img`    
    position: relative;
    float: center;
    width:  auto;
    height: 300px;
    background-position: 50% 50%;
    background-repeat:   no-repeat;
    background-size:     cover;
`;

const ProfilesCards = (profiles) => {
    const classes = cardStyles();

    const handleUpdateClick = async id => {
        profiles.history.push(`/doggos/update/${id}`);
    };

    const handleDeleteDoggo = async (id, name) => {
        if (
            window.confirm(
                `Are you sure you want to delete doggo '${name}' permanently?`,
            )
        ) {
            api.deleteDoggoById(id);
            window.location.reload();
        };
    };

    const handleViewProfile = async id => {
        profiles.history.push(`/doggos/profile/${id}`);
    };

    return (
        <React.Fragment>
            {profiles.profiles !== null && profiles.profiles !== undefined
                ? profiles.profiles.map((profile, index) =>
                    <Box
                        key={index}
                        component='div'
                        display='inline'
                        p={1}
                        m={1}
                    >
                        <Card className={classes.root} raised={true}>
                            <CardActionArea onClick={() => handleViewProfile(profile._id)}>
                                <CardMedia>
                                    <Image
                                        src={`${config.profilePicDir}/${profile.fileName}`}
                                        alt='Profile Image'
                                        thumbnail
                                        fluid
                                    />
                                </CardMedia>

                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='h5'>
                                        {profile.name}
                                    </Typography>

                                    <Typography variant='h5' color='textSecondary'>
                                        {profile.breed}
                                        <br />
                                        {profile.age} years old
                                        <br />
                                        {profile.gender}
                                        <br />
                                        {profile.weight} lbs
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.cardActions}>
                                <Button
                                    size='small'
                                    color='primary'
                                    onClick={() => handleViewProfile(profile._id)}
                                >
                                    View Profile
                                    </Button>
                                <Button
                                    size='small'
                                    color='inherit'
                                    onClick={() => handleUpdateClick(profile._id)}
                                >
                                    Update Profile
                                    </Button>
                                <Button
                                    size='small'
                                    color='secondary'
                                    onClick={() => handleDeleteDoggo(profile._id, profile.name)}
                                >
                                    Delete Doggo
                                    </Button>
                            </CardActions>

                        </Card>
                    </Box>
                )
                : <Typography gutterBottom variant='h5' component='h5'>
                    No Doggo Profiles, Click 'Add Profile' to add a new one
                </Typography>}
        </React.Fragment>
    );
};

export default ProfilesCards;