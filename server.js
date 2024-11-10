const express = require("express");
const app = express();
const path = require("path");
const data = [];
const cors = require("cors");
const User = require("./userModel/userModel");
const event = require("./userModel/eventModel");
const { default: mongoose } = require("mongoose");
//const { message } = require("prompt");
require("dotenv").config();
const port = process.env.PORT || 8000;

console.log(event);

//app.set("viee engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(express.static("demo"));

mongoose.connect(process.env.DBurl);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/vi ews/about.html");
});
app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});

app.get("/create-events", (req, res) => {
  res.sendFile(__dirname + "/views/create.html");
});
app.get("/find-events", (req, res) => {
  res.sendFile(__dirname + "/views/find.html");
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
list = [];
app.post("/api/events", async (req, res) => {
  try {
    // Extract event data from the request body
    const {
      eventId,
      name,
      description,
      date,
      time,
      location,
      imageUrl,
      eventType,
      categories,
      hiring,
      interested,
      lookingFor,
      hiring1,
    } = req.body;

    // Create a new event document in the database
    const newEvent = await event.create({
      eventId,
      name,
      description,
      date,
      time,
      location,
      imageUrl,
      eventType,
      categories,
      hiring,
      interested,
      lookingFor,
      hiring1,
    });

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
    console.log("event entered");
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
});
app.get("/events", async (req, res) => {
  try {
    const events = await event.find({ type: "event" });

    // Send the events as an array to the client
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error while fetching events." });
  }
});

app.get("/events/locations0/:location", async (req, res) => {
  try {
    const location = req.params.location;

    // Find all events where location is 'kaduna' (or any other location passed in the request)
    const events = await event.find({
      location: location,
      categories: ["music", "business"],
    });
    //   console.log(events);

    // Send the events as an array to the client
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error while fetching events." });
  }
});
app.get("/events/locations1/:location", async (req, res) => {
  try {
    const location = req.params.location;

    // Find all events where location is 'kaduna' (or any other location passed in the request)
    const events = await event.find({ location: location, hiring: true });

    // Send the events as an array to the client
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error while fetching events." });
  }
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});

async function deleteAllEvents() {
  try {
    // Connect to MongoDB (Replace with your MongoDB connection string)

    // Delete all documents in the collection
    const result = await event.deleteMany({});
    console.log(
      `Deleted ${result.deletedCount} documents from the events collection`
    );
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
}

//deleteAllEvents();

const server = app.listen(port, () => {
  console.log("running");
});
