const express = require("express")
const User = require("../module/usermodule")
const { getAllUser, getUserById, delUserById , createUser } = require("../controller/userController");
const router = express.Router()

router.get("/", getAllUser)
router.get("/:id", getUserById)
router.post("/", createUser)
router.delete("/:id", delUserById)

module.exports = router;