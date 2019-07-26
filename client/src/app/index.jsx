import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from '../components';
import { DoggoProfiles, DoggosPost, DoggoUpdate } from '../pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/doggos/profiles" exact component={DoggoProfiles} />
                <Route path="/doggos/create" exact component={DoggosPost} />
                <Route
                    path="/doggos/update/:id"
                    exact
                    component={DoggoUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App;