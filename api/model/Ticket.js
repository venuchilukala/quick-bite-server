const mongoose = require('mongoose')
const { Schema } = mongoose

const ticketSchema = new Schema({
    name: String,
    email: String,
    queryText: {
        type: String,
        required: true,
    },
    isSolved: {
        type: Boolean,
        default : false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Ticket = mongoose.model("ticket", ticketSchema)
module.exports = Ticket