const mongoose = require('mongoose')
const { Schema } = mongoose;

const paymentSchema = new Schema({
    email: String,
    transactionId: String,
    price: Number,
    quantity: Number,
    status: String,
    itemName: Array,
    cartItems: Array,
    menuItems: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Payment = mongoose.model("payment", paymentSchema);
module.exports = Payment;