const Product = require('../models/product.model');
const productService = require('../services/product.services');

const logger = require('../logger/logger');

exports.findAll = async(req, res) => {
  console.log("Find all products from collection products");

  try{
    const result = await productService.findAll();
    res.status(200).json({status: true, data: result});
    logger.info("Success in reading all products");
    logger.warn("Success in reading all products");
    logger.error("Message with error");
  } catch(err){
    console.log("Problem in reading products", err);
    logger.error("Problem in reading all products", err);
    res.status(400).json({status:false, data: err});
  }
}

exports.findOneById = async(req, res) => {
  console.log("Find product with specific product ID");
  const id = req.params.id;

  try {
    const result = await productService.findOneById(id);
    if (result){
      res.status(200).json({status: false, data: result});
    } else {
      res.status(404).json({status: false, data: "Product not exist"})
    }
  } catch (err){
    console.log("Problem in finding product", err)
    res.status(400).json({status: false, data: err});
  }
}

exports.create = async(req, res) => {
  console.log("Create User");
  let data = req.body;  

  const newProduct = new Product({
    product: data.product,
    cost: data.cost,
    description: data.description,
    quantity: data.quantity
  })

  try{
    const result = await newProduct.save();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in creating user", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.updateById = async(req, res) => {
  const id = req.body.id;

  console.log("Update product with productId", id);

  const updateProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,  
    quantity: req.body.quantity
  };

  try {
    const result = await Product.findOneAndUpdate({_id: id}, updateProduct, {new: true});
    res.status(200).json({status:true, data:result});
  } catch(err){
    console.log("Problem in updating product", err);
    res.status(400).json({status:false, data:err});
  }
}

exports.deleteById = async(req, res) => {
  const id = req.body.id;

  console.log("Delete product by id", id);

  try {
    const result = await Product.findOneAndDelete({_id: id});
    res.status(200).json({status:true, data: result})
  } catch(err) {
    console.log("Problem in deleting by product ID", err);
    res.status(400).json({status: false, data: err});
  }
}
