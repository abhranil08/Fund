import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getUserFromDatabase } from '../../firebase/utility';
import { database } from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './AddUnits.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const AddUnits = props => {
  const { currentUser, unitPrice, orderId, history } = props;
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
          const currentDate = new Date();
          return database.ref('OrderDesc').push({
            date: currentDate.toDateString() + " " + currentDate.toTimeString(),
            paymentId: paymentId.key,
            price_per_unit: unitPrice,
            units: amount
          })
        })
        .then(async orderDesc => {
          const orderRef = await database.ref('orders/' + orderId).once('value');
          const currentOrder = orderRef.val();
          const nextIndex = Object.values(currentOrder.orderDescription).length + 1;
          const updatedOrderDesc = {
            ...currentOrder.orderDescription
          }
          updatedOrderDesc[`desc${nextIndex}`] = {
            action: 'buy',
            id: orderDesc.key,
            successful: true
          }
          const updatedOrder = {
            ...currentOrder,
            orderDescription: {
              ...updatedOrderDesc
            },
            unitsLeft: +currentOrder.unitsLeft + (+amount),
          }
          return database.ref('orders/' + orderId).update({
            ...updatedOrder
          })
        })
        .then(order => {
          history.push('/payment-success');
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
      <Col md={6} className="d-flex justify-content-around align-items-center">
        <Button
          variant="primary"
          disabled={amount === 0 ? true : false} onClick={e => setAmount(amt => amt - 1)}>
          <FontAwesomeIcon icon={faMinusCircle} />
        </Button>
        {amount}
        <Button variant="primary" onClick={e => setAmount(amt => amt + 1)}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      </Col>
      <Col md={4}>
        <Button variant='primary' onClick={openPayModal} disabled={amount === 0 ? true : false}>Buy {amount} units</Button>
      </Col>
    </Row>
  </div>
);
}

export default withRouter(AddUnits);