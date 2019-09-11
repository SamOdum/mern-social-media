const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// Route    GET api/auth
// Desc     Test Route
// Access   Public
router.get('/', auth, async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Route    POST api/auth
// Desc     Authenticate user and get token
// Access   Public
router.post(
    "/",
    [
      check("email", "Please provide a valid email").isEmail(),
      check("password", "Password is required").exists()
    ],
    async (req, res) => {
      // console.log(req.body);
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // **Confirm that user exists
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "invalid login details" }] });
        }
  
        // **Return jsonwebtoken
        const payload = {
          user: {
            id: user.id
          }
        };

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if(!passwordMatch) {
            return res
            .status(400)
            .json({ errors: [{ msg: "invalid login details" }] });
        }

        jwt.sign(
          payload,
          config.get("jwtToken"),
          { expiresIn: 3600000 }, //**Change to 3600 before deployment */
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