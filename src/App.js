import React, { useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './App.module.css';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

import firebase from './firebase/config';

const App = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);

  const storeUser = (userID) => {
    setUserID(userID);
    setIsAuthenticated(true);
    alert('Signed in successfully!');
    console.log(userID);
  };

  const handleSignOut = useCallback(async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
    alert('Signed out successfully!');
    setIsAuthenticated(false);
    setUserID(null);
  }, []);

  return (
    <main className={classes.App}>
      <Navigation isAuthenticated={isAuthenticated} userID={userID} handleSignOut={handleSignOut} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" render={(props) => <Login {...props} storeUser={storeUser} />} />
        <Route path="/signup" render={(props) => <Signup {...props} storeUser={storeUser} />} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
