const multer = require('multer');

const storage = multer.diskStorage({}); // No local storage setup since files are uploaded to Cloudinary

// Add file filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only image files are allowed'), false); // Reject file
  }
};

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Limit file size to 5MB
});

module.exports = upload;
