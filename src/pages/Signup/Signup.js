import React, { useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import firebase from '../../firebase/config';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import classes from './Signup.module.css';

const isValid = (email, passwd) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const validEmail = emailRegex.test(email);
  const validPasswd = passwd.length >= 6;
  return validEmail && validPasswd;
}

const Signup = props => {
  const { history, storeUser } = props;
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [formError, setFormError] = useState(false);

  const formSubmit = () => {
    if (isValid(inputEmail, inputPassword)) {
      setFormError(false);
      handleSignUp(inputEmail, inputPassword);
    } else {
      console.log('Invalid username or password!');
      setFormError(true);
    }
  }

  const handleSignUp = useCallback(async (email, password) => {
    try {
      const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
      storeUser(userCredentials.uid);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }, [history, storeUser])

  return (
    <section className={classes.signup}>
      <Container>
        <Row className="py-2">
          <Col md={7} className="my-2 p-2 d-flex justify-content-center align-items-center">
            <Card className={classes.signupCard} body>
              <Form>
                {formError && <Alert variant="danger">Invalid email or password!</Alert>}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={event => setInputEmail(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={hiddenPassword ? "password" : "text"}
                    placeholder="Password"
                    onChange={event => setInputPassword(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Show Password" onChange={event => setHiddenPassword(!hiddenPassword)} />
                </Form.Group>
                <Button className={classes.signupButton} variant="primary" onClick={formSubmit}>
                  Sign Up
                </Button>
                <div className="mt-3">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </Form>
              <hr />
              <span className={classes.googleSignIn}><FontAwesomeIcon className="mr-3" icon={faGoogle} size="2x" /> Sign Up with Google</span>
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