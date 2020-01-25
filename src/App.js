import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import classes from './App.module.css';
import PrivateRoute from './hoc/PrivateRoute';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import FundDisplay from './pages/FundDisplay/FundDisplay';

import firebase from './firebase/config';
import { getUsernameFromDatabase } from './firebase/utility';
import { AuthContext } from './context/authContext';

const App = props => {
  const { history } = props;
  const { currentUser } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (currentUser) {
      getUsernameFromDatabase(currentUser.uid)
        .then(usr => {
          setUserName(usr)
          setIsAuthenticated(true);
          history.push('/');
        })
        .catch(err => console.log(err));
    } else {
      console.log('no user signed in');
    }
  }, [currentUser, history]);

  const handleSignOut = useCallback(async () => {
    try {
      await firebase.auth().signOut();
      setIsAuthenticated(false);
      setUserName('');
      alert('Signed out successfully!');
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <main className={classes.App}>
      <Navigation isAuthenticated={isAuthenticated} userName={userName} handleSignOut={handleSignOut} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/search" exact component={Search} />
        <Route path="/search/:mfSchemeCode" exact component={FundDisplay} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
      <Footer />
    </main>
  );
}

export default withRouter(App);
