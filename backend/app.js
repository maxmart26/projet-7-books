require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const booksRoutes = require('./routes/books');// importation des routes pour les livres
const userRoutes = require('./routes/user');// importation des routes pour les utilisateurs
const mongo_SERVEUR = `mongodb+srv://${process.env.User}:${process.env.MDP}@${process.env.serveur_mongo}`; // importation du lien au mongoDB
const app = express();// création de l'application express



mongoose.connect(mongo_SERVEUR,
  { useNewUrlParser: true,// middleware pour la connexion à la base de données
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());// middleware pour la récupération des données en json
app.use(express.urlencoded({ extended: true }));// middleware pour la récupération des données en urlencoded
app.use("/images", express.static("image"));// middleware pour la récupération des images
app.use((req, res, next) => { // middleware pour la gestion des erreurs CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use('/api/books', booksRoutes);// middleware pour la gestion des routes pour les livres
app.use('/api/auth', userRoutes);// middleware pour la gestion des routes pour les utilisateurs


module.exports = app;