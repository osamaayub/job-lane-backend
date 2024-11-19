const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the upload folder exists, create it if not
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Folder to save files in
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${fileExt}`); // Use a unique name for each file
  }
});

// Define upload settings
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit (adjusted for a larger file size)
  },
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const mimeTypeValid = allowedTypes.test(file.mimetype);
    const extnameValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    // Check file type and extension
    if (mimeTypeValid && extnameValid) {
      return cb(null, true); // Proceed with the upload
    }
    // Return error if file type is not allowed
    cb(new Error(`Invalid file type: ${file.mimetype}. Allowed formats: .jpeg, .jpg, .png, .pdf`));
  }
});

module.exports = upload;
