const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/', verifyToken, productController.findAll);
router.get('/:id', verifyToken, productController.findOneById);
router.post('/', verifyToken, verifyRoles("ADMIN"), productController.create);
router.patch('/:id', verifyToken, verifyRoles("ADMIN"), productController.updateById);
router.delete('/:id', verifyToken, verifyRoles('ADMIN'), productController.deleteById);


module.exports = router;