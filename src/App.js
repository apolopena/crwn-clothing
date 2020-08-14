import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import './App.css';

import { NoMatchPage } from './pages/404/';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/checkout' component={CheckoutPage} />
        <Route 
          exact path='/signin' 
          render={ () => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) } />
        <Route component={NoMatchPage} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

// get currentUser from redux store and put it in props
const mapStateToProps = (state) => createStructuredSelector({
  currentUser: selectCurrentUser,
});

// pass user to props (1st arg), set action to props (for setting state in the redux store) 2nd arg
export default connect(mapStateToProps, mapDispatchToProps)(App);
