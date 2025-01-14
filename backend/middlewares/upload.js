const multer = require('multer');

const storage = multer.diskStorage({}); 
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only image files are allowed'), false); 
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;
