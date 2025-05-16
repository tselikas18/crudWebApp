const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let productSchema = new Schema({
  product: {
    type: String,
    required: [true, "Product is required field"],
    max: 20,
    unique: true,
    trim: true,
    lowercase: true
  },
  cost: {
    type: Number,
    required: [true, "Cost is required field"],
  },
  description: {
    type: String,
    required: [false],
    max: 20,
    unique: false,
    trim: false,
    lowercase: true
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required field"]
  }
})

module.exports = mongoose.model("Product", productSchema)