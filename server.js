const express = require("express");
const connectDB = require("./config/db");

const App = express();

// Connecct to the database
connectDB();

App.get("/", (req, res) => res.send("API is running"));

// Define routes
App.use("/api/auth", require("./routes/api/auth"));
App.use("/api/posts", require("./routes/api/posts"));
App.use("/api/profile", require("./routes/api/profile"));
App.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => console.log(`Server started on port ${PORT}`));
