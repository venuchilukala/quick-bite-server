const express = require('express')
const router = express.Router()

//const get models 
const Payment = require('../model/Payment')

//import middleware 
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

//Get all Payments
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const result = await Payment.find().sort({ createdAt: -1 })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//make order confirmation
router.patch('/:id', async (req, res) => {
    const paymentId = req.params.id
    const { email, transactionId, price, quantity, status, itemName, cartItems, menuItems } = req.body
    try {
        const updatedBooking = await Payment.findByIdAndUpdate(
            paymentId,
            { status: 'Order confirmed' },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Payment not found" })
        }
        res.status(200).json(updatedBooking)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete a menu item 
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    const bookingId = req.params.id
    try {
        const deleteBooking = await Payment.findByIdAndDelete(bookingId)
        if (!deleteBooking) {
            return res.status(404).json({ message: "Booking is not found" })
        }
        res.status(200).json({ message: "Booking deleted successfully!" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router



