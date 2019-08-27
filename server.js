const express = require("express");
// const mongoose = require("mongoose");
const connectDB = require("./config/db");

const App = express();
connectDB();
// const db =
//   "mongodb+srv://Sam123:Sam123@mernsocialmedia-dpvgj.mongodb.net/test?retryWrites=true&w=majority";
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB connected..."))
//   .catch(err => console.log(err));

App.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => console.log(`Server started on port ${PORT}`));
