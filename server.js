const express = require("express");
const app = express();
const path = require("path");
const data = [];
const cors = require("cors");
const User = require("./userModel/model");
const { default: mongoose } = require("mongoose");
//const { message } = require("prompt");
require("dotenv").config();
const port = process.env.PORT || 8000;

console.log(User);

//app.set("viee engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(express.static("demo"));

//mongoose.connect(process.env.DBurl);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/vi ews/about.html");
});
app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});

app.get("/create-event", (req, res) => {
  res.sendFile(__dirname + "/views/create.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/views/signup.html");
});

app.post("/signup", async (req, res) => {
  // const { name, email, password, username } = req.body;
  // // res.json({ gh: "jbh" });
  // try {
  //   // Check if the user already exists
  //   const existingUser = User.findOne({});
  //   console.log(existingUser);
  //   if (existingUser) {
  //     return res.status(400).json({ message: "User already exists" });
  //   }

  //   // Create a new user (no password hashing here)
  //   const newUser = new User({
  //     name,
  //     email,
  //     password,
  //     username,
  //   });

  //   // Save the user to the database
  //   newUser.save();

  //   // Send success response
  //   res.status(201).json({ message: "User registered successfully" });
  // } catch (e) {
  //   res.status(500).json({ message: "skill issue" });
  // }
  const user = await User.create(req.body);
  // console.log(my);
  res.json({
    message: "signup successful",
    data: user,
  });
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== req.body.pass) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      message: "Login successful",
      data: user,
      status: 200,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred",
      error: err.message,
    });
  }
});

app.get("/Reviews", (req, res) => {
  res.sendFile(__dirname + "/views/reviews.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});
const server = app.listen(port, () => {
  console.log("running");
});
