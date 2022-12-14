const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Messages } = require("../models");
const { Op } = require("sequelize");
const e = require("express");

router.post("/", async (req, res) => {
  const {
    sender_id,
    receiver_id,
    sender_profile_picture,
    receiver_profile_picture,
    username,
    message,
    chatId,
    userId,
  } = req.body;
  const createdMessage = Messages.create({
    sender_id: sender_id,
    receiver_id: receiver_id,
    sender_profile_picture: sender_profile_picture,
    receiver_profile_picture: receiver_profile_picture,
    username: username,
    message: message,
    chatId: chatId,
    UserId: userId,
  });

  res.json("Message sent!");
});
router.get("/inbox/:id", async (req, res) => {
  const myId = req.params.id;
  const inbox = await Messages.findAll({
    where: {
      [Op.or]: [{ UserId: myId }, { receiver_id: myId }],
    },
  });
  res.json(inbox);
});

router.get("/chat/:id", async (req, res) => {
  const chat = req.params.id;
  const chatById = await Messages.findAll({ where: { chatId: chat } });
  res.json(chatById);
});

module.exports = router;
