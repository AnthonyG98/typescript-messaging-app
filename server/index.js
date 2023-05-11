const express = require("express");
const app = express();
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = require("./models");
//routes
const users = require("./routes/users");
app.use("/users", users);
const messages = require("./routes/messages");
app.use("/message", messages);

const API_KEY = "Get your own damn key";

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Best places to visit in Compton, CA?" },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("server started!");
    });
  })
  .catch((err) => {
    console.log(`ERROR: ${err.message}`);
  });
