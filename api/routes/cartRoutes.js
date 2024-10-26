const express = require('express');
const Carts = require('../model/Carts');

const router = express.Router();
const cartContollers = require('../controllers/cartControllers')

const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, cartContollers.getCartByEmail)
router.post('/', cartContollers.addToCart)
router.delete('/:id', cartContollers.deleteCartItem)
router.put('/:id', cartContollers.updateCart)
router.get('/:id', cartContollers.getSingleCart)


module.exports = router