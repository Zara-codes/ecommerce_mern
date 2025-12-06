import { EsewaPaymentGateway, EsewaCheckStatus } from "esewajs"
import Order from "../model/orderModel.js"
import User from "../model/userModel.js"
import dotenv from "dotenv"
dotenv.config()
import crypto from "crypto"
import axios from "axios"


const currency = 'NPR'

// For Users
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body
    const userId = req.userId

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }


    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    }

    const newOrder = new Order(orderData)
    await newOrder.save()

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartData = { ...user.cartData }; // copy existing cart

    // Remove purchased items
    items.forEach((item) => {
      const { _id, size } = item;  // match the frontend fields
      if (cartData[_id] && cartData[_id][size]) {
        delete cartData[_id][size];
        // If no sizes left for this product, remove the product
        if (Object.keys(cartData[_id]).length === 0) {
          delete cartData[_id];
        }
      }
    });

    // Update cart in DB
    await User.findByIdAndUpdate(userId, { cartData });
    return res.status(201).json({ message: 'Order Placed' })
  } catch (error) {
    console.log(`placeOrder error: ${error}`)
    res.status(500).json({ message: 'Order Place error' })
  }
}



export const userOrders = async (req, res) => {
  try {
    const userId = req.userId
    const orders = await Order.find({ userId })
    return res.status(200).json(orders)
  } catch (error) {
    console.log(`userOrders error: ${error}`)
    return res.status(500).json({ message: "userOrders error" })
  }
}


// For Admin
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
    return res.status(200).json(orders)
  } catch (error) {
    console.log(`allOrders error: ${error}`)
    return res.status(500).json({ message: "adminAllOrders error" })
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    await Order.findByIdAndUpdate(orderId, { status })
    return res.status(201).json({ message: "Status Updated" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const esewaSuccess = async (req, res) => {
  try {
    const { data } = req.query;

    if (!data) return res.status(400).send("Missing order data");

    // Decode the base64 JSON
    const decoded = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));

    const { transaction_uuid, status, total_amount, product_code } = decoded;

    if (!transaction_uuid) return res.status(400).send("Missing order id");

    // Here, transaction_uuid is the same as your transactionId
    const order = await Order.findOne({ transactionId: transaction_uuid });

    if (!order) return res.status(404).send("Order not found");

    if (status === "COMPLETE") {
      order.payment = true;
      order.status = "Paid";
      await order.save();

      return res.redirect(`http://localhost:5173/esewa-success?transactionId=${transaction_uuid}`);
    } else {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?orderId=${order._id}`);
    }
  } catch (err) {
    console.error("esewaSuccess error:", err);
    return res.status(500).send("Esewa verification failed");
  }
};


export const esewaFailed = (req, res) => {
  return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`)
}


// For esewa payment integration

export const placeOrderByEsewa = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const transactionId = "TXN_" + Date.now();

    const paymentRequest = await EsewaPaymentGateway(
      amount,
      0,                  // tax
      0,                  // service charge
      0,                  // delivery charge
      transactionId,      // productId
      process.env.ESEWA_MERCHANT_ID,
      process.env.SECRET,
      process.env.ESEWA_SUCCESS_URL,
      process.env.ESEWA_FAILED_URL,
      process.env.ESEWAPAYMENT_URL
    );

    if (!paymentRequest || paymentRequest.status !== 200) {
      return res.status(400).json({ message: "Error initiating payment" });
    }

    // Create order
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "eSewa",
      payment: false,
      transactionId,
      date: Date.now()
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartData = { ...user.cartData }; // copy existing cart

    // Remove purchased items
    items.forEach((item) => {
  const { _id, size } = item; // product id and size
  if (cartData[_id] && cartData[_id][size]) {
    delete cartData[_id][size]; // remove the purchased size
    if (Object.keys(cartData[_id]).length === 0) {
      delete cartData[_id]; // remove product if no sizes left
    }
  }
});

// Update only the affected items
await User.findByIdAndUpdate(userId, { cartData });
    // Send the correct eSewa URL
    return res.json({
      url: paymentRequest.request.res.responseUrl + `&transactionId=${transactionId}`,
      transactionId
    });


  } catch (error) {
    console.log("placeOrderByEsewa error:", error);
    return res.status(500).json({ message: "Esewa order error" });
  }
};
