const ToDoModel = require('../models/ToDoModel');

exports.getToDo = async (req, res) => {
    try {
        const toDos = await ToDoModel.find();
        res.status(200).json(toDos);
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Error fetching to-dos', error 
        });
    }
};

exports.addToDo = async (req, res) => {
    const { toDo } = req.body;
    if (!toDo) {
        return res.status(400).json({ 
            success: false, 
            message: 'To-do item is required' 
        });
    }

    try {
        const newToDo = new ToDoModel({ toDo });
        await newToDo.save();
        res.status(201).json({ 
            success: true, 
            message: 'To-do added successfully', 
            data: newToDo 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error adding to-do', 
            error 
        });
    }
};

exports.updateToDo = async (req, res) => {
    const { id } = req.body;
    const { toDo } = req.body;

    if (!toDo) {
        return res.status(400).json({ 
            success: false, 
            message: 'To-do item is required' 
        });
    }

    try {
        const updatedToDo = await ToDoModel.findByIdAndUpdate(id, { toDo }, { new: true });
        if (!updatedToDo) {
            return res.status(404).json({ 
                success: false, 
                message: 'To-do not found' 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: 'To-do updated successfully', 
            data: updatedToDo 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error updating to-do', 
            error 
        });
    }
};

exports.deleteToDo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedToDo = await ToDoModel.findByIdAndDelete(id);
        if (!deletedToDo) {
            return res.status(404).json({ 
                success: false, 
                message: 'To-do not found' 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: 'To-do deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting to-do', 
            error 
        });
    }
};