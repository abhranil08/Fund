import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/config';
import { getUserFromDatabase } from '../../firebase/utility';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './PayWithRazorpay.module.css';

const PayWithRazorpay = props => {
  const { unitPrice, schemeCode, currentUser } = props;
  const [userDetails, setUserDetails] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      getUserFromDatabase(currentUser.uid)
        .then(user => setUserDetails(user))
        .catch(err => console.log(err));

      return () => {
        document.body.removeChild(script);
      }
  }, [currentUser.uid]);

  const getOrder = (price) => {
    return fetch('https://fundtax-node-server.herokuapp.com/getOrder', {
      mode: 'cors',
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: price
      })
    })
  }

  const openPayModal = async () => {
    let order;
    try {
      const price = (+amount * +unitPrice).toFixed(2) * 100;
      const res = await getOrder(price);
      order = await res.json();
      console.log(order);

      const options = {
        key: 'rzp_test_Et6HlLticl7pe8',
        amount: (+amount * +unitPrice).toFixed(2) * 100,
        order_id: order.id,
        currency: 'INR',
        name: 'Fundtax Guru',
        description: 'some description',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
          alert('Payment successful' + response.razorpay_payment_id);
          database.ref('Invoice').push({
            credit: (+amount * +unitPrice).toFixed(2),
            currency: 'INR',
            debit: 0,
            razorpay_payment_id: response.razorpay_payment_id,
            userId: currentUser.uid
          })
          .then(paymentId => {
            return database.ref('OrderDesc').push({
              date: new Date().toLocaleString(),
              paymentId: paymentId.key,
              price_per_unit: unitPrice,
              units: amount
            })
          })
          .then(orderDesc => {
            return database.ref('orders').push({
              orderDescription: {
                desc1: {
                  action: 'buy',
                  id: orderDesc.key,
                  successful: true
                }
              },
              costValue: +unitPrice,
              schemeCode: schemeCode,
              unitsLeft: amount,
              userID: currentUser.uid
            })
          })
          .then(async order => {
            const userRef = await database.ref('users/' + currentUser.uid).once('value');
            const user = userRef.val();
            const nextIndex = Object.values(user.Orders).length + 1;
            const updatedOrders = {
              ...user.Orders
            }
            updatedOrders[`order${nextIndex}`] = {
              orderId: order.key,
              schemeCode: schemeCode
            }
            const updatedData = {
              ...user,
              Orders: {
                ...updatedOrders
              }
            }
            database.ref('users/' + currentUser.uid).update(updatedData);
          })
          .catch(err => console.log(err));
        },
        "prefill": {
          "name": userDetails.username,
          "email": userDetails.email
        },
        theme: {
            color: 'blue',
            hide_topbar: false
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.flexContainer}>
      <Row className={classes.fullWidth}>
        <Col md={8}>
          <Form.Control type='number' placeholder="0" onChange={e => setAmount(e.target.value)}></Form.Control>
        </Col>
        <Col md={4}>
          <Button variant='primary' onClick={openPayModal}>Buy {amount} units</Button>
        </Col>
      </Row>
    </div>
  );
}

export default PayWithRazorpay;