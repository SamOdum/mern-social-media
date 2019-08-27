const express = require('express');
const router = express.Router();

// Route    GET api/users
// Desc     Test Route
// Access   Public
router.get('/', (req, res)=> res.send('User route'));

module.exports = router;