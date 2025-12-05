import express from 'express'
import isAuth from '../middleware/isAuth.js'
import adminAuth from '../middleware/adminAuth.js'
import { allOrders, esewaFailed, esewaSuccess, placeOrder, placeOrderByEsewa, updateStatus, userOrders } from '../controller/orderController.js'

const orderRoutes = express.Router()

// For User
orderRoutes.post("/placeorder", isAuth, placeOrder)
orderRoutes.post("/userorder", isAuth, userOrders)
// orderRoutes.get("/userorder", isAuth, userOrders)

// For Admin
// orderRoutes.post("/list", adminAuth, allOrders)
orderRoutes.get("/list", adminAuth, allOrders)
orderRoutes.post("/status", adminAuth, updateStatus)

// For payment via esewa
orderRoutes.post("/placeorderbyesewa", isAuth, placeOrderByEsewa)
orderRoutes.get("/esewa-success", esewaSuccess )
orderRoutes.get("/esewa-failed", esewaFailed )

export default orderRoutes