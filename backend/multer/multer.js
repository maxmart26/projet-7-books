const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path"); // Importation du module path



// middleware pour la récupération de l'image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase() + Date.now() + ".jpg";
    cb(null,  fileName);
  },
});
const upload = multer({
  storage: storage
});
function processImage(req, res, next) {
  if (!req.file) {
    return next();
  }
  console.log(req.file);
  const imagePath = req.file.path;
  const imageName = path.basename(imagePath);
  console.log("imagename:",imageName);
  const resizedImagePath = path.join("multer","..","image",  `${imageName}-resized.jpg`) // Utilisation de path.join

  sharp(imagePath)
    .resize(500, 500)
    .toFile(resizedImagePath, (err) => {
      if (err) {
        return next(err);
      }
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting original image:", unlinkErr);
        }
      });
      req.file.path = resizedImagePath; // Mettre à jour le chemin de l'image avec l'image redimensionnée
      next();
    });
}

module.exports = { upload, processImage };