const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify');
const bookCtrl = require('../controllers/books');
const auth = require('../middleware/auth'); 
const {upload,processImage} = require('../multer/multer');




router.get('/', bookCtrl.getAllBook);// route pour la récupération de tous les livres
router.post('/',auth, upload.single("image"),processImage, bookCtrl.createBook);// route pour la création d'un livre
router.get('/bestrating',bookCtrl.bestrating);// route pour la récupération des 3 meilleurs livres
router.get('/:id', bookCtrl.getBook);// route pour la récupération d'un livre
router.post('/:id/rating', bookCtrl.ratingBook);// route pour la notation d'un livre
router.put('/:id',verify,upload.single("image"),processImage,bookCtrl.uptateOneBook);// route pour la modification d'un livre
router.delete('/:id',verify,bookCtrl.deleteBook );// route pour la suppression d'un livre


module.exports = router