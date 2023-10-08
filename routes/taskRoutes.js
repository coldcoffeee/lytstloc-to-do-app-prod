const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers");
const requireAuth = require("../middlewares/authMiddleware");

router.use(requireAuth);

router.get("/", taskControllers.getAllTasks);

router.post("/", taskControllers.addTask);

router.patch("/:id", taskControllers.editTask);

router.delete("/:id", taskControllers.deleteTask);

router.patch("/:id/complete", taskControllers.markTaskCompleted);

module.exports = router;
