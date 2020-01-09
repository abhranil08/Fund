import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from './App.module.css';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';

import firebase, { database } from './firebase/config';
import { AuthContext } from './context/authContext';

const getUsernameFromDatabase = async (userId) => {
  const userRef = await database.ref('users/' + userId).once('value');
  const user = userRef.val();
  return user.username;
}

const writeUserData = (userId, userName, email) => {
  database.ref('users/' + userId).set({
    username: userName,
    email: email
  });
}

const App = props => {
  const { currentUser } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (currentUser) {
      // console.log('current user', currentUser);
      getUsernameFromDatabase(currentUser.uid)
        .then(usr => {
          setUserName(usr)
          setIsAuthenticated(true);
        });
    } else {
      console.log('no user signed in');
    }
  }, [currentUser]);

  const storeUserName = useCallback((userName) => {
    setUserName(userName);
    setIsAuthenticated(true);
    alert('Signed in successfully!');
  }, []);

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
        <Route path="/login"
          render={(props) => <Login {...props}
                                storeUserName={storeUserName}
                                getUsernameFromDatabase={getUsernameFromDatabase} />} />
        <Route path="/signup"
          render={(props) => <Signup {...props}
                                storeUserName={storeUserName}
                                writeUserData={writeUserData} />} />
        <Route path="/dashboard"
          render={(props) => isAuthenticated ? <Dashboard {...props} /> : <Redirect to="/login" />} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
