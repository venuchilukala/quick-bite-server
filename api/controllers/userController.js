const User = require('../model/User')

//get all users
const getAllUsers = async(req, res) => {

    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//Create a user 
const createUser = async(req, res) =>{
    const user = req.body 
    const query = {email : user.email}
    try {
        const existingUser = await User.findOne(query)
        if(existingUser){
            return res.status(302).json({message : "User already exists"})
        }
        const result = await User.create(user)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//delete a user 
const deleteUser = async(req,res)=>{
    const userId = req.params.id 
    try {
        const deletedUser = await User.findByIdAndDelete(userId)
        // if user not fond
        if(!deletedUser){
            return res.status(404).json({message : "User not found"})
        }
        res.status(200).json({message : "User deleted successfully"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//get an admin
const getAdmin = async (req, res) =>{
    const email = req.params.email 
    const query = {email: email}
    try {
        const user = await User.findOne(query)
        if(email !== req.params.email){
            return res.status(403).json({message : "Forbidden Access"})
        }

        let admin = false
        if(user){
            admin = user?.role === "admin"
        }
        res.status(200).json({admin})
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//Admin status update 
const makeAdmin = async (req, res) =>{
    const userId = req.params.id 
    const {role} = req.body

    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message : "User is not found"})
        }

        user.role = user.role === 'admin' ? 'user' : 'admin'
        const updatedUser = await user.save()

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

 module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getAdmin,
    makeAdmin
 }