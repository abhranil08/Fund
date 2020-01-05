import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './App.module.css';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = props => {
  return (
    <main className={classes.App}>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/signup" render={(props) => <Signup {...props} />} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
