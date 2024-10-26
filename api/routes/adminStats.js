const express = require('express')
const router = express.Router();


//Get models
const User = require('../model/User')
const Menu = require('../model/Menu')
const Payment = require('../model/Payment')

//import middleware
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.countDocuments();
        const menuItems = await Menu.countDocuments();
        const orders = await Payment.countDocuments();

        const result = await Payment.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: '$price'
                    }
                }
            }
        ])
        const revenue = result.length > 0 ? result[0].totalRevenue : 0

        res.json({
            users,
            menuItems,
            orders,
            revenue
        })
    } catch (error) {
        res.status(500).json({message : error. message})
    }
})

module.exports = router