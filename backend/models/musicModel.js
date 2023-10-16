const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the music name"],
    },
    genre: {
        type: String,
        required: [true, "Please enter the music genre"],
    },
    file: {
        type: String,
        required: [true, "Please upload the music file"],
    },
    singer: {
        type: String,
        required: [true, "Please enter the singer's name"],
    },
    movie: {
        type: String,
        required: [true, "Please enter the movie name"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Music", musicSchema);
