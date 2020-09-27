import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import AddSpeeche from '../pages/AddSpeeche';

import BuySpeeches from '../pages/BuySpeeches';
import User from '../pages/User';
import ViewSpeeche from '../pages/ViewSpeeche';
import UpdateSpeeche from '../pages/UpdateSpeeche';

import SendMail from '../pages/SendMail';
import SendMailAllUsers from '../pages/SendMailAllUsers';
import ProfilePage from '../pages/Profile';

import ForgotPassword from '../pages/ForgotPassword';
import ListPost from '../pages/Posts/ListPost';
import ViewPost from '../pages/Posts/ViewPost';
import Cart from '../pages/Cart';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />

      <Route path="/video/:id" isPrivate component={ViewSpeeche} />
      <Route path="/cart" isPrivate component={Cart} />
      <Route path="/dashboard" isPrivate component={Dashboard} />
      <Route path="/add-speeche" isPrivate component={AddSpeeche} />
      <Route path="/profile" isPrivate component={ProfilePage} />
      <Route
        path="/speeche/update/:courseId"
        isPrivate
        component={UpdateSpeeche}
      />
      <Route path="/buy-speeches" isPrivate component={BuySpeeches} />
      <Route path="/users/sendmail" isPrivate component={SendMailAllUsers} />
      <Route path="/users/sendmail/:uuidUser" isPrivate component={SendMail} />
      <Route path="/users" isPrivate component={User} />

      <Route path="/posts/new" isPrivate component={ViewPost} />
      <Route path="/posts" isPrivate component={ListPost} />
    </Switch>
  );
};

export default Routes;
