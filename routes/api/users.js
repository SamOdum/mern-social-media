const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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
  (req, res) => {
    console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    res.send("User route");
  }
);

module.exports = router;
