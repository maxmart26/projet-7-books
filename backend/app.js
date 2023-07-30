require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const mongo_SERVEUR = `mongodb+srv://${process.env.User}:${process.env.MDP}@${process.env.serveur_mongo}`;
const app = express();



mongoose.connect(mongo_SERVEUR,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());
app.use("/images", express.static("uploads"));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;