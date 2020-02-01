import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './PayWithRazorpay.module.css';

const PayWithRazorpay = props => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
  }, []);

  const openPayModal = async () => {
    const options = {
      key: 'rzp_test_Et6HlLticl7pe8',
      amount: amount * 100,
      currency: 'INR',
      name: 'Fundtax Guru',
      description: 'some description',
      image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
      handler: function(response) {
          alert(response.razorpay_payment_id);
      },
      theme: {
          color: 'blue',
          hide_topbar: false
      }
    };
    
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className={classes.flexContainer}>
      <Row className={classes.fullWidth}>
        <Col md={8}>
          <Form.Control type='number' placeholder="0" onChange={e => setAmount(e.target.value)}></Form.Control>
        </Col>
        <Col md={4}>
          <Button variant='primary' onClick={openPayModal}>Pay Rs. {amount} with Razorpay</Button>
        </Col>
      </Row>
    </div>
  );
}

export default PayWithRazorpay;