const multer = require("multer");
const path = require("path");

const musicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads"));
  },
  filename: function (req, file, cb) {
    const originalNameWithoutSpaces = file.originalname.replace(/\s+/g, "-");
    const filename = path.parse(originalNameWithoutSpaces).name;
    cb(null, filename + "-" + Date.now() + path.extname(file.originalname));
  },
});

exports.uploadMusic = multer({ storage: musicStorage });
