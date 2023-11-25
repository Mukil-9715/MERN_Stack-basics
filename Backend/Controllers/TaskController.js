const TaskModel = require("../models/TaskModel");
const mongoose = require("mongoose");

//To Create a task - post

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await TaskModel.create({ title, description });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//To Get a task - Get

const getTask = async (req, res) => {
  try {
    const task = await TaskModel.find();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//To Get a task - Get

const getSingleTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Task ID" });
  }

  try {
    const singleTask = await TaskModel.findById(id);
    if (!singleTask) {
      return res.status(404).json({ message: "Invalid Task ID" });
    }
    res.status(200).json(singleTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! To get task update

const updateTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Task ID" });
    }
    
    try {
        const updateTask = await TaskModel.findByIdAndUpdate(
            {_id:id},{...req.body}
            );
            
            if (!updateTask) {
                return res.status(404).json({ message: "Invalid Task ID" });
            }
            res.status(200).json(updateTask);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
    //To delete a task - Get
    
    const deleteTask = async (req, res) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Task ID" });
      }
    
      try {
        const deleteTask = await TaskModel.findByIdAndDelete(id);
        res.status(200).json(deleteTask);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    
    
    module.exports = { createTask, getTask, getSingleTask, updateTask, deleteTask };
