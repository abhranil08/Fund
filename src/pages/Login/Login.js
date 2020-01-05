import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Login.module.css';

const isValid = (email, passwd) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const validEmail = emailRegex.test(email);
  const validPasswd = passwd.length >= 6;
  return validEmail && validPasswd;
}

const Login = props => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const formSubmit = () => {
    if (isValid(inputEmail, inputPassword)) {
      console.log('valid email and password!');
    } else {
      console.log('Invalid username or password!');
    }
  }

  return (
    <section className={classes.login}>
      <Container>
        <Row className="py-2">
          <Col md={7} className="my-2 p-2 d-flex justify-content-center align-items-center">
            <Card className={classes.loginCard} body>
              <Form>
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
                <Button className={classes.loginButton} variant="primary" onClick={formSubmit}>
                  Login
                </Button>
                <div className="mt-3">
                  <Link to="/signup">Create an account</Link>
                </div>
              </Form>
              <hr />
              <span className={classes.googleSignIn}><FontAwesomeIcon className="mr-3" icon={faGoogle} size="2x" /> Login with Google</span>
            </Card>
          </Col>
          <Col md={5} className="my-2 p-2 d-flex justify-content-center align-items-center">
            <div className={classes.loginInfo}>
              <h4>Login to FundTax Guru</h4>
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

export default Login;