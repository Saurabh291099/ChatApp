const express = require('express');
const { createMessage, getMesaages } = require('../Controllers/messageController');

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMesaages);




module.exports = router;