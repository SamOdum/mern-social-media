const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Route    GET api/profile/me
// Desc     Get profile of current user
// Access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avater"]);

        if (!profile) {
            return res.status(400).json({ msg: "This user has no profile" })
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Route    POST api/profile
// Desc     Create or update user profile
// Access   Private
router.post("/", [auth, [
    check("status", "Status is required").not().isEmpty()   //Continue from here///////////
]](req, res) => {
    f
});

module.exports = router;