const express = require("express");
const app = express();
const path = require("path");
const data = [];
const cors = require("cors");
const User = require("./userModel/userModel");
const event = require("./userModel/eventModel");
const { default: mongoose } = require("mongoose");
const { name } = require("ejs");

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
app.get("/place-ads", (req, res) => {
  res.sendFile(__dirname + "/views/ad.html");
});
app.get("/events/:eventId", (req, res) => {
  res.sendFile(__dirname + "/views/event.html");
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
  try {
    const { userId, name, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create a new user instance
    const newUser = new User({
      userId,
      name,
      email,
      password, // Storing password directly for development; remember to hash in production
    });

    // Save the user in the database
    await newUser.save();
    console.log("user sign up");
    res
      .status(201)
      .json({ message: "User created successfully", userId, name, email });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      message: "Login successful",
      userId: user.userId,
      name: user.name,
      email: user.email,
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
      userId,
      contactPhone,
      contactEmail,
      detailedInfo,
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
      userId,
      contactPhone,
      contactEmail,
      detailedInfo,
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
    const events = await event
      .find({
        location: location,
      })
      .sort({ interested: -1 })
      .limit(10);
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

app.get("/api/events/search", async (req, res) => {
  try {
    const { location, categories, eventType, hiring } = req.query;

    // Build the query object
    const query = {};
    if (location) query.location = location;
    if (categories) query.categories = { $in: categories.split(",") };
    if (eventType) query.eventType = { $in: eventType.split(",") };
    if (hiring) query.hiring = { $in: hiring.split(",") };
    // console.log(query);
    const events = await event.find(query);
    //console.log(events);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.get("/api/interested/:eventId/:userId", async (req, res) => {
  console.log(1);
  try {
    const { eventId, userId } = req.params;

    // Find the event and add the userId to interestedPeople if not already present
    const event1 = await event.findOne({ eventId: eventId });
    if (!event1) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (!event1.interestedPeople.includes(userId)) {
      event1.interestedPeople.push(userId);
      event1.interested = event1.interestedPeople.length; // Update interested count
      await event1.save();
    }

    res.status(200).json({
      message: "Marked interest successfully",
      interested: event.interested,
    });
  } catch (error) {
    console.error("Error marking interest:", error);
    res.status(500).json({ error: "Failed to mark interest" });
  }
});

// Route to unmark interest
app.get("/api/uninterested/:eventId/:userId", async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    // Find the event and remove the userId from interestedPeople if present
    const event1 = await event.findOne({ eventId: eventId });
    if (!event1) {
      return res.status(404).json({ error: "Event not found" });
    }

    const userIndex = event1.interestedPeople.indexOf(userId);
    if (userIndex > -1) {
      event1.interestedPeople.splice(userIndex, 1); // Remove the user from interestedPeople
      event1.interested = event1.interestedPeople.length; // Update interested count
      await event1.save();
    }

    res.status(200).json({
      message: "Unmarked interest successfully",
      interested: event.interested,
    });
  } catch (error) {
    console.error("Error unmarking interest:", error);
    res.status(500).json({ error: "Failed to unmark interest" });
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

async function deleteAllUsers() {
  try {
    // Connect to MongoDB (Replace with your MongoDB connection string)

    // Delete all documents in the collection
    const result = await User.deleteMany({});
    console.log(
      `Deleted ${result.deletedCount} documents from the usres collection`
    );
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
}
//deleteAllEvents();
//deleteAllUsers();

const server = app.listen(port, () => {
  console.log("running");
});
