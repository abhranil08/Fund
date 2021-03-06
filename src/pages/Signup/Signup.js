import React, { useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import firebase from '../../firebase/config';
import { writeUserData } from '../../firebase/utility';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import classes from './Signup.module.css';

const isValid = (email, passwd) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const validEmail = emailRegex.test(email);
  const validPasswd = passwd.length >= 6;
  return validEmail && validPasswd;
}

const Signup = props => {
  const { history } = props;
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  const handleSignUp = useCallback(async (email, password, userName) => {
    try {
      const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
      writeUserData(userCredentials.user.uid, userName, email);
      setIsLoading(false);
      history.push('/');
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [history])

  const formSubmit = useCallback((event) => {
    event.preventDefault();
    setError(null);
    const { username, email, password } = event.target.elements;
    setIsLoading(true);
    if (isValid(email.value, password.value)) {
      setFormError(false);
      handleSignUp(email.value, password.value, username.value);
    } else {
      setFormError(true);
      setIsLoading(false);
    }
  }, [handleSignUp]);

  return (
    <section className={classes.signup}>
      <Container>
        <Row className="py-2">
          <Col md={7} className="my-2 p-2 d-flex justify-content-center align-items-center">
            <Card className={classes.signupCard} body>
              <Form onSubmit={formSubmit}>
                {formError && <Alert variant="danger">Invalid email or password!</Alert>}
                {error && <Alert variant="danger">{error.message}</Alert>}
                <Form.Group controlId="formBasicName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type={hiddenPassword ? "password" : "text"}
                    placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Show Password" onChange={event => setHiddenPassword(!hiddenPassword)} />
                </Form.Group>
                <Button className={classes.signupButton} variant="primary" type="submit">
                  Sign Up&nbsp;&nbsp;
                  {isLoading && <Spinner animation="grow" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>}
                </Button>
                <div className="mt-3">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </Form>
              <hr />
              <span className={classes.googleSignIn} onClick={handleGoogleSignIn}>
                <FontAwesomeIcon className="mr-3" icon={faGoogle} size="2x" /> Sign Up with Google
              </span>
            </Card>
          </Col>
          <Col md={5} className="my-2 p-2 d-flex justify-content-center align-items-center">
            <div className={classes.signupInfo}>
              <h4>Register to FundTax Guru</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <ul>
                <li>Some info 1</li>
                <li>Some info 2</li>
                <li>Some info 2</li>
                <li>Some info 2</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default withRouter(Signup);