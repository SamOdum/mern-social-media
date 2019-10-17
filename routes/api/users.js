const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// Route    POST api/users
// Desc     Register user
// Access   Public
router.post(
  "/",

  // use express-validator to ensure fields are filled properly
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
    // console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { name, email, password } = req.body;

    try {
      // **Confirm that user does not already exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }
      // **Fetch user's gravatar image
      const avatar = await gravatar.url(email, {
        s: "200", // defaut size
        r: "pg",  // rating
        d: "mm"   // default
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // **Encrypt user's password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // console.log(user);

      // **Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 3600000 }, //**Change to 3600 before deployment ******************************/
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
      // res.send("User registered");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
