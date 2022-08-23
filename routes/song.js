const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Song = require("../models/Song");

router.post("/get-all-songs", authMiddleware, async (req, res) => {
  try {
    const songs = await Song.find();
    return res.status(200).json({
      songs,
      message: "Songs fetched successfully",
    });
  } catch (error) {
    console.error(`getAllSongs - ${error}`);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
