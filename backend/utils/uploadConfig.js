const path = require("path");
const fs = require("fs");
const multer = require("@koa/multer");

const uploadDir = path.join(__dirname, "..public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "avatar-" + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

module.exports = upload;
