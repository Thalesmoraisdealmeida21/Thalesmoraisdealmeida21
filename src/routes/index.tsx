import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import AddSpeeche from '../pages/AddSpeeche';

import BuySpeeches from '../pages/BuySpeeches';
import ViewSpeeche from '../pages/ViewSpeeche';

import ForgotPassword from '../pages/ForgotPassword';

import Cart from '../pages/Cart';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />

    <Route path="/video/:uuid/:token" isPrivate component={ViewSpeeche} />
    <Route path="/cart" isPrivate component={Cart} />
    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/add-speeche" isPrivate component={AddSpeeche} />
    <Route path="/buy-speeches" isPrivate component={BuySpeeches} />
  </Switch>
);

export default Routes;
