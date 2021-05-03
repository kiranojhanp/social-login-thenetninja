require("dotenv").config();
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");

// process.env.MONGO_URI

const express = require("express");
const app = express();

// set view engine
app.set("view engine", "ejs");

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI, () => {
  console.log('Connected to mongoDB');
});

// set up routes
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(5000, () => {
  console.log("app now listening for requests on port 5000");
});
