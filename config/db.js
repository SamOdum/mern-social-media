const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// **Connect to database**
// **Quit the app on failure to connect**

// <<**Regular promise based connection**>>
// const connectDB = () =>
//   mongoose.connect(db, { useNewUrlParser: true }, () =>
//     console.log("MongoDB is successfully connected")
//   );

// <<**Async/Await implementation**>>
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true }, () =>
      console.log("MongoDB is connected...")
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
