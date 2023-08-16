require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const SharpMulter  =  require("sharp-multer");
const path = require("path");
//const { upload,  } = require("./multer/multer");

const booksRoutes = require('./routes/books');// importation des routes pour les livres
const userRoutes = require('./routes/user');// importation des routes pour les utilisateurs
const mongo_SERVEUR = `mongodb+srv://${process.env.User}:${process.env.MDP}@${process.env.serveur_mongo}`; // importation du lien au mongoDB
const app = express();// création de l'application express





mongoose.connect(mongo_SERVEUR,
  { useNewUrlParser: true,// middleware pour la connexion à la base de données
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/images", express.static("image"));
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "image");
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.toLowerCase() + Date.now() + ".jpg";
      cb(null, Date.now() + "-" + fileName);
    },
  });
  
  const upload = multer({
    storage: storage
  });
  
  app.post("/upload", upload.single("image"), (req, res) => {
    res.send("Image uploaded successfully!");
  });
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use('/api/books', booksRoutes);
  app.use('/api/auth', userRoutes);
  
  module.exports = app;