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
  try {
    const userRef = await database.ref('users/' + userId).once('value');
    const user = userRef.val();
    return user.username;
  } catch (err) {
    console.log(err);
    return '';
  }
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
      firebase.auth().getRedirectResult()
        .then(result => {
          if (result.user && result.additionalUserInfo.isNewUser) {
            const user = result.user;
            writeUserData(user.uid, user.displayName, user.email);
          }
        })
        .catch(err => console.log(err));
      getUsernameFromDatabase(currentUser.uid)
        .then(usr => {
          setUserName(usr)
          setIsAuthenticated(true);
        })
        .catch(err => console.log(err));
    } else {
      console.log('no user signed in');
    }
  }, [currentUser]);

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
        <Route path="/login"
          render={(props) => !isAuthenticated ? <Login {...props} /> : <Redirect to="/" />} />
        <Route path="/signup"
          render={(props) => !isAuthenticated ? <Signup {...props} writeUserData={writeUserData} /> : <Redirect to="/" />} />
        <Route path="/dashboard"
          render={(props) => isAuthenticated ? <Dashboard {...props} user={currentUser} /> : <Redirect to="/login" />} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
