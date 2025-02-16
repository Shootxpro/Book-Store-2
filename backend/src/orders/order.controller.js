const mongoose = require("mongoose");
const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    // Ensure productIds is an array of valid ObjectIds
    if (req.body.productIds && Array.isArray(req.body.productIds)) {
      req.body.productIds = req.body.productIds.map(id => new mongoose.Types.ObjectId(id));
    } else {
      return res.status(400).json({ message: "Invalid productIds format" });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};


const getOrderByEmail = async (req, res) => {
  try {
    const {email} = req.params;
    const orders = await Order.find({email}).sort({createdAt: -1});
    if(!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
}

module.exports = {
  createAOrder,
  getOrderByEmail
};