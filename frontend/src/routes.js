import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //importando as rotas a serem configuradas

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

function Routes() {
  return(
    <BrowserRouter>
      <Switch> 
        <Route path="/" exact component={Logon} /> {/* pegará o caminho '/' e irá componentizar o Logon */}
        <Route path="/register" component={Register} /> 
        <Route path="/profile" component={Profile} /> 
        <Route path="/incidents/new" component={NewIncident} /> 
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;