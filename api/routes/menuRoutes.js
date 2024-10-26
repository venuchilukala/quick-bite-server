const express = require('express')
const router = express.Router()

const menuController = require('../controllers/menuControllers')

//Get all menu items
router.get('/', menuController.getAllMenuItems)

// post a menu item
router.post('/', menuController.postMenuItem)

//Delete a menu item
router.delete('/:id', menuController.deleteMenuItem)

//Get single item 
router.get('/:id', menuController.singleMenuItem)

//Update single menu item 
//Using patch because we used ::::findbyIdandUpdate()
router.patch('/:id', menuController.updateMenuItem)

module.exports = router