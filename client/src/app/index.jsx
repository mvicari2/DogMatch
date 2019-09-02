import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from '../components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    DoggoProfiles, 
    DoggosPost, 
    DoggoUpdate, 
    Profile, 
    TemperamentProfile, 
    BiographyProfile,
    AlbumUpload 
} from '../pages';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route 
                    path='/' 
                    exact 
                    component={DoggoProfiles} 
                />
                <Route 
                    path='/doggos/create' 
                    exact 
                    component={DoggosPost} 
                />
                <Route
                    path='/doggos/update/:id'
                    exact
                    component={DoggoUpdate}
                />
                <Route 
                    path='/doggos/profile/:id' 
                    exact 
                    component={Profile} 
                />
                <Route 
                    path='/doggos/temperament/:id' 
                    exact 
                    component={TemperamentProfile} 
                />
                <Route 
                    path='/doggos/biography/:id' 
                    exact 
                    component={BiographyProfile} 
                />
                <Route 
                    path='/doggos/album/:id' 
                    exact 
                    component={AlbumUpload} 
                />
            </Switch>
        </Router>
    );
};

export default App;