import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Words from './pages/Words';

const Root: React.FC = () => (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/:category/:wordSet">
            <Words />
        </Route>
    </Switch>
);

export default Root;
