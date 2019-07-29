import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from '../components';
import { DoggoProfiles, DoggosPost, DoggoUpdate } from '../pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../pages/Profile';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={DoggoProfiles} />
                <Route path="/doggos/create" exact component={DoggosPost} />
                <Route
                    path="/doggos/update/:id"
                    exact
                    component={DoggoUpdate}
                />
                <Route path="/doggos/profile/:id" exact component={Profile} />
            </Switch>
        </Router>
    )
}

export default App;