const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.post("/validate", userControllers.validateToken);

module.exports = router;
