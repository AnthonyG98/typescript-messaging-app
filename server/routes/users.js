const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { Op } = require("sequelize");
const e = require("express");

router.post("/", async (req, res) => {
  const { username, password, profile_picture } = req.body;
  const checkUser = await Users.findOne({  where: { username: username } } );
  if(!checkUser){
    const createdUser = bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        //password hashing payload as well as input password
        password: hash,
        profile_picture: profile_picture,
      });
    });
    res.json("Success");
  }
  else {
    return res.json("User already exists");
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({  where: { username: username } } );
  if (!user) {
    res.json({ error: "User does not exist." });
  } 
  if(user){
    const validPass = await bcrypt.compare(password.payload, user.password);
      if(validPass){
        res.json(user)
      }else {
        res.json({error: "Wrong username or password."})
      }
    }   
});
router.get("/:username", async(req, res)=>{
  const user = req.params.username;
  const returnedUser = await Users.findOne({where:{
    username: user
  }});
  res.json(returnedUser)
});
module.exports = router;