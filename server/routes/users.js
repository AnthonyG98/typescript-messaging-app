const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { Op } = require("sequelize");
const e = require("express");

const loginAfterSignUp = (signUpUser) => {
  router.post("/login", async (req, res) => {
    const { password } = req.body;
    const user = await Users.findOne({ where: { username: signUpUser } });
    // if (!user) {
    //   res.json({ error: "User does not exist." });
    // }
    // if(user){
    //   const validPass = await bcrypt.compare(password.payload, user.password);
    //     if(validPass){
    //       res.json(user)
    //     }else {
    //       res.json({error: "Wrong username or password."})
    //     }
    //   }
    res.json(user);
  });
};
router.post("/", async (req, res) => {
  const { username, password, profile_picture } = req.body;
  const checkUser = await Users.findOne({ where: { username: username } });
  if (!checkUser) {
    const createdUser = bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        //password hashing payload as well as input password
        password: hash,
        profile_picture: profile_picture,
      });
      // loginAfterSignUp(req.body.username);
    });
    // router.get(`/${username}`, async(req, res) =>{
    //   const newUser = await Users.findOne({ where: {username: username}});

    //   return newUser
    // })
    res.json(createdUser);
  } else {
    return res.json("User already exists");
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User does not exist." });
  }
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      res.json(user);
    } else {
      res.json({ error: "Wrong username or password." });
    }
  }
});
router.get("/:username", async (req, res) => {
  const user = req.params.username;
  const returnedUser = await Users.findOne({
    where: {
      username: user,
    },
  });
  res.json(returnedUser);
});

router.put("/profile/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const profilePicture = req.params.id;
  const image = await Users.findOne({
    where: { id: profilePicture },
  });

  const { profile_picture } = req.body;

  image.profile_picture = profile_picture;

  await image.save();
  res.json("updated");
});

module.exports = router;
