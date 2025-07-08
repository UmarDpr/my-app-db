// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const OrderDetails = require('../models/order_details');

// POST /api/order_details
router.post('/', async (req, res) => {
    try {
        const Orders = new OrderDetails({
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            eventDate: req.body.eventDate, 
            menu: req.body.menu,
            venue: req.body.venue,
        });
        const savedOrder = await Orders.save();
        res.status(201).json({ message: 'Order saved successfully', data: savedOrder });
    } catch (err) {
        res.status(500).json({ error: 'Error saving order', details: err });
    }
});

// GET /api/order_details
router.get('/', async (req, res) => {
    const order_details = await OrderDetails.find();
    res.json(order_details); 
});

// PUT /api/order_details/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await OrderDetails.findByIdAndUpdate(
      req.params.id,
      {
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        eventDate: req.body.eventDate,
        menu: req.body.menu,
        venue: req.body.venue
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', data: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Error updating order', details: err.message });
  }
});

module.exports = router; 
