const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  toggleBlockUser,
  promoteUser
} = require("../controllers/adminController");

router.get("/users", verifyToken, isAdmin, getAllUsers);
router.put("/block/:id", verifyToken, isAdmin, toggleBlockUser);
router.put("/promote/:id", verifyToken, isAdmin, promoteUser);

module.exports = router;