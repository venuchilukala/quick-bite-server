const express = require('express')
const router = express.Router()

//middlewares
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin');

const Ticket = require('../model/Ticket');

//get queries 
router.get('/',verifyToken, verifyAdmin, async(req, res) =>{
    try {
        const result = await Ticket.find().sort({createdAt: -1})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// update status
router.patch('/:id',verifyToken, verifyAdmin, async (req, res) => {
    const ticketId = req.params.id;
    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        // Toggle the isSolved status
        ticket.isSolved = !ticket.isSolved;
        const updatedTicket = await ticket.save();
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: `Error updating ticket status: ${error.message}` });
    }
});

//Delete query
router.delete('/:id', verifyToken, verifyAdmin, async(req, res) =>{
    const ticketId = req.params.id 
    try {
        const deleteQuery = await Ticket.findByIdAndDelete(ticketId)

        if(!deleteQuery){
            return res.status(404).json({message : "Query is not found"})
        }

        res.status(200).json({message : "Query deleted successfully"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

module.exports = router