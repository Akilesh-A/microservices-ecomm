const cloudinary = require('cloudinary').v2;
const multer = require('multer');


// ✅ Cloudinary config
cloudinary.config({
    cloud_name: 'dhon9uj5z',
    api_key: '565211165563145',
    api_secret: 'SabkNzou9h2PIMngQLX2cMnyCrs'
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };