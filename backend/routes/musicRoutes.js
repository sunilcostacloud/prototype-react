const express = require("express");
const router = express.Router();
const { uploadMusic } = require("../multer");
const {
    createMusic,
    getMusicByUser,
    editMusic,
    deleteMusic,
    getSingleMusic,
} = require("../controllers/musicController");
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// Route for uploading music with authentication middleware
router.post(
    "/upload",
    uploadMusic.single("musicFile"),
    createMusic
);

// Route to get all music uploaded by the authenticated user
router.get("/get-music", getMusicByUser);

router.get("/get-music/:id", getSingleMusic);

// Route to edit a specific music record (including the music file) by ID
router.put(
    "/edit-music/:id",
    uploadMusic.single("musicFile"),
    editMusic
);

// Route for deleting a music record by ID
router.delete("/delete-music/:id", deleteMusic);

module.exports = router;
