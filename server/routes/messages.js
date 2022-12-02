const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Messages } = require("../models");
const { Op } = require("sequelize");
const e = require("express");

router.post("/", async (req, res) => {
    const { sender_id, receiver_id, profile_picture, username, message, chatId } = req.body;
    const createdMessage = Messages.create({
      sender_id: sender_id,
      receiver_id: receiver_id,
      profile_picture: profile_picture,
      username: username,
      message: message,
      chatId: chatId
    });
  
    res.json("Message sent!");
});

module.exports = router;
