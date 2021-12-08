const Razorpay = require('razorpay');
const crypto = require("crypto");
const Order = require('../models/orders')


// const instance = new Razorpay({
//   key_id: process.env.KEYID,
//   key_secret: process.env.KEYSECRET,
// });



const createOrder = async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount) {
      return res.status(400).send();
    }

    const options = {
      amount,
      currency: "INR",
      receipt: "order_rcptid_11"
    };

    instance.orders.create(options, function(err, order) {
      if (err) {
        throw Error(err);
      }

      res.status(201).send(order.id);
    });
  } catch(error) {
    next(error);
  }
}


const verifySignature = async (req, res, next) => {
  const body = `${req.body.orderId}|${req.body.paymentId}`;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.KEYID)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === req.body.signature) {
    res.status(200).send(true);
  } else {
    res.status(400).send(false);
  }
}

const completePayment = async (req, res, next) => {
  const { orderId, paymentId } = req.body;

  try {
    const order = await Order.findOneAndUpdate(orderId, { paymentId });
    res.status(200).send(order._id);
  } catch(error) {
    next(error);
  }
}


module.exports =  {
  createOrder,
  verifySignature,
  completePayment
};
