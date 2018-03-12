import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import Store from './Store';
import Admin from './Admin';

export const Main = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Admin} />
      <Route path="/store" component={Store} />
    </Switch>
  </HashRouter>
);
