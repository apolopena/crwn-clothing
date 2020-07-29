import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {

  unsubscribeFromAuth = null;


  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      // if user is authenticated...
      if (userAuth) {
        // ...check if db for user data, and set it into state object.
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });

      } else { // ...otherwise set user to empty/null
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route 
            exact path='/signin' 
            render={ () => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) } />
        </Switch>
      </div>
    );
  }

}

// get currentUser from redux store and put it in props
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

// dispatch action to set currentUser via the action which sets the payload
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch( setCurrentUser(user) )
});

// pass user to props (1st arg), set action to props (for setting state in the redux store) 2nd arg
export default connect(mapStateToProps, mapDispatchToProps)(App);
