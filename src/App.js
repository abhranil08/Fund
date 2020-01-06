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
  // const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState('');

  const storeUser = (userID, userName) => {
    // setUserID(userID);
    setUserName(userName);
    setIsAuthenticated(true);
    alert('Signed in successfully!');
    // console.log(userID);
  };

  const handleSignOut = useCallback(async () => {
    try {
      await firebase.auth().signOut();
      alert('Signed out successfully!');
      setIsAuthenticated(false);
      setUserName('');
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <main className={classes.App}>
      <Navigation isAuthenticated={isAuthenticated} userName={userName} handleSignOut={handleSignOut} />
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
