const Music = require("../models/musicModel");
const fs = require("fs").promises;
const path = require("path");

exports.createMusic = async (req, res, next) => {
    try {
        const { name, genre, singer, movie } = req.body;

        const music = await Music.create({
            name,
            genre,
            file: req.file.filename,
            singer,
            movie,
            user: req.userId,
        });

        res.status(201).json({
            message: "Music upload successful",
            music,
        });
    } catch (error) {
        res
            .status(400)
            .json({ message: "Music upload failed", error: error.message });
    }
};

// Get all music uploaded by the authenticated user

exports.getMusicByUser = async (req, res, next) => {
    try {
        const { search, genre, page } = req.query;
        const ITEM_PER_PAGE = 2;

        const query = {
            $or: [
                { name: { $regex: search || "", $options: "i" } },
                { singer: { $regex: search || "", $options: "i" } },
                { movie: { $regex: search || "", $options: "i" } },
            ],
            user: req.userId,
        };

        if (genre && genre !== "all") {
            query.genre = genre;
        }

        const count = await Music.countDocuments(query);
        const pageCount = Math.ceil(count / ITEM_PER_PAGE);
        const currentPage = parseInt(page) || 1;
        const skip = (currentPage - 1) * ITEM_PER_PAGE;

        const userMusic = await Music.find(query)
            .skip(skip)
            .limit(ITEM_PER_PAGE)
            .sort({ createdAt: 1 });

        const allData = await Music.find({ user: req.userId });

        // Extract unique fields dynamically
        const uniqueFields = new Set();
        allData.forEach((music) => {
            uniqueFields.add(music.genre);
        });

        const genreFields = [...uniqueFields]; // Convert Set to an array

        res.status(200).json({
            music: userMusic,
            genreField: genreFields,
            pageCount,
            currentPage,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve user's music",
            error: error.message,
        });
    }
};




// Edit a specific music record by ID
exports.editMusic = async (req, res, next) => {
    try {
        const userId = req.userId;
        const musicId = req.params.id;

        const music = await Music.findOne({ _id: musicId, user: userId });

        if (!music) {
            return res
                .status(404)
                .json({ message: "Music record not found or unauthorized" });
        }

        // Update text fields
        if (req.body.name) {
            music.name = req.body.name;
        }
        if (req.body.genre) {
            music.genre = req.body.genre;
        }
        if (req.body.singer) {
            music.singer = req.body.singer;
        }
        if (req.body.movie) {
            music.movie = req.body.movie;
        }

        // Update music file if provided
        if (req.file) {
            // Delete the old music file
            // await fs.unlink(
            //     path.join(__dirname, "../uploads/musicFiles", music.file)
            // );
            await fs.unlink(path.join(__dirname, "../uploads", music.file));

            // Update the music file with the new uploaded file
            music.file = req.file.filename;
        }

        await music.save();

        res
            .status(200)
            .json({ message: "Music record updated successfully", music });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to update music record", error: error.message });
    }
};

// Delete a specific music record by ID
exports.deleteMusic = async (req, res, next) => {
    try {
        const userId = req.userId;
        const musicId = req.params.id;

        const music = await Music.findOne({ _id: musicId, user: userId });

        if (!music) {
            return res
                .status(404)
                .json({ message: "Music record not found or unauthorized" });
        }

        // Delete associated music file
        await fs.unlink(path.join(__dirname, "../uploads", music.file));

        // Delete the music record from the database
        await Music.findByIdAndDelete(musicId);

        res.status(200).json({ message: "Music record deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to delete music record", error: error.message });
    }
};


// Get a single music by ID
exports.getSingleMusic = async (req, res, next) => {
    try {
        const userId = req.userId;
        const musicId = req.params.id;

        const music = await Music.findOne({ _id: musicId, user: userId });

        if (!music) {
            return res
                .status(404)
                .json({ message: "Music record not found or unauthorized" });
        }

        res.status(200).json({ music });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to retrieve music record", error: error.message });
    }
};
