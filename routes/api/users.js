const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// Route    POST api/users
// Desc     Register user
// Access   Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { name, email, password } = req.body;

    try {
      // TO DOs

      // **Confirm that user exists
      const user = User.findOne({ email });
      if (user) {
        res.status(400).send({ errors: [{ msg: "User already exists!" }] });
      }
      // **Fetch user's gravatar image
      // **Encrypt user's password
      // **Return jsonwebtoken

      res.send("User route");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
