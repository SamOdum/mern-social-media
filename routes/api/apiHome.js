const express = require("express");
const router = express.Router();

// Route    GET api
// Desc     Test Route
// Access   Public
router.get("/", (req, res) => res.send("ApiHome route"));

module.exports = router;
