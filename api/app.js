const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');

const app = express();
app.use(bodyParser.json({ extended: false }));

const instance = new Razorpay({
  key_id: 'RAZORPAY_KEY_ID',
  key_secret: 'RAZORPAY_KEY_SECRET'
})

app.get('/', (req, res) => {
  res.send("fundtax node server running!");
})

app.post('/getOrder', (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: '0'
  };
  instance.orders.create(options, function(err, order) {
    res.send(order);
  });
})

app.listen(process.env.PORT || 2000, () => console.log("Server ready"));