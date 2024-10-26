const Menu = require("../model/Menu");

//Get all menus
const getAllMenuItems = async (req, res) => {
    try {
        const menus = await Menu.find({}).sort({ createdAt: -1 });
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Post a menu item
const postMenuItem = async (req, res) => {
    const newItem = req.body

    try {
        const result = await Menu.create(newItem)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Delete a menu item 
const deleteMenuItem = async (req, res) => {
    const menuId = req.params.id
    try {
        const deleteMenu = await Menu.findByIdAndDelete(menuId)
        if (!deleteMenu) {
            return res.status(404).json({ message: "Menu item not found" })
        }
        res.status(200).json({ message: "Menu item deleted successfully!" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get single menu item 
const singleMenuItem = async (req, res) => {
    const menuId = req.params.id
    try {
        const menu = await Menu.findById(menuId)
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Update single menu item 
const updateMenuItem = async (req, res) => {
    const menuId = req.params.id
    const { name, recipe, image, category, price } = req.body

    try {
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, { name, recipe, image, category, price }, { new: true, runValidator: true })
        if (!updatedMenu) {
            return res.status(404).json({ message: "Menu item not found" })
        }
        res.status(200).json(updatedMenu)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    singleMenuItem,
    updateMenuItem
}