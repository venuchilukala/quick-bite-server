const express = require('express')
const router = express.Router()

//middlewares
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin');

const Ticket = require('../model/Ticket');

//Post a query
router.post('/', verifyToken, async(req, res) => {
    const ticket = req.body 
    try {
        const result = await Ticket.create(ticket)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});

//get specific queries 
router.get('/',verifyToken, async(req, res) =>{
    try {const email = req.query.email;
        const query = { email: email }
        const result = await Ticket.find(query).sort({createdAt: -1}).exec()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

module.exports = router