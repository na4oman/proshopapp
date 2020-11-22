import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    orderItems,
    paymentMethod,
    shippingAddress,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      orderItems,
      paymentMethod,
      shippingAddress,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});
