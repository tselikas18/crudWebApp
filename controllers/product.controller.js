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
  console.log("Find product with specific id");
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