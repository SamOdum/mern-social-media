const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

// Route    GET api/auth
// Desc     Test Route
// Access   Public
router.get('/', auth, (req, res)=> res.send('Auth route'));

module.exports = router;