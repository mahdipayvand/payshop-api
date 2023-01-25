const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, path.resolve(__dirname, "../../public/uploads"));
  },
  filename: function (_, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage });
