const express = require('express')
const { registerUser, loginUser, findUser, getUsers } = require("../Controllers/userController")

const router = express.Router();

// router.get("/register", (req, res )=>{
//     res.send("Register")
// });

// dynamic way of routing by controller 
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/allusers", getUsers);

module.exports = router;  