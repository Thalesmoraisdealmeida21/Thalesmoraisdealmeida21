import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import AddSpeeche from '../pages/AddSpeeche';

import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />

    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/add-speeche" isPrivate component={AddSpeeche} />
  </Switch>
);

export default Routes;
