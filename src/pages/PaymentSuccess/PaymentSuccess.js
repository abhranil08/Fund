import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const PaymentSuccess = props => {
  return (
    <Jumbotron>
      <h1>Payment successful!</h1>
      <p>
        <Link to="/dashboard"><Button variant="primary">Go to Dashboard</Button></Link>
      </p>
    </Jumbotron>
  );
}

export default PaymentSuccess;