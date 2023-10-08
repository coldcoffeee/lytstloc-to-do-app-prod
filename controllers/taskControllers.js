const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page);
    const itemsPerPage = parseInt(req.query.itemsPerPage);
    const offset = (page - 1) * itemsPerPage;

    const tasks = await Task.find({ user: userId })
      .skip(offset)
      .limit(itemsPerPage);
    const totalTasksCount = await Task.countDocuments({ user: userId });
    res.json({
      tasks,
      totalTasksCount,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;

    const newTask = await Task.create({
      title,
      description,
      user: userId,
    });
    const totalTasksCount = await Task.countDocuments({ user: userId });
    res.status(201).json({ newTask, totalTasksCount });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const totalTasksCount = await Task.countDocuments({ user: req.userId });

    res.status(200).json({ message: "Task deleted", totalTasksCount });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const markTaskCompleted = async (req, res) => {
  try {
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error marking task as completed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  editTask,
  deleteTask,
  markTaskCompleted,
};
