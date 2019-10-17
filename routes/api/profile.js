const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
// Route    GET api/profile/me
// Desc     Get profile of current user
// Access   Public
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

module.exports = router;