const express = require('express')
const { registerUser, loginUser, findUser, getUsers } = require("../Controllers/userController")

const router = express.Router();

// router.get("/register", (req, res )=>{
//     res.send("Register")
// });

// dynamic way of routing by controller 
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/find/:userId", findUser);
router.get("/allusers", getUsers);
router.get("/", getUsers);

// console.log("users:", getUsers)
module.exports = router;  