const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');
const auth = require('../middleware/auth'); 
const {upload} = require('../multer/multer');


router.get('/', bookCtrl.getAllBook);// route pour la récupération de tous les livres
router.post('/',auth, upload.single("image"), bookCtrl.createBook);// route pour la création d'un livre
router.get('/bestrating',bookCtrl.bestrating);// route pour la récupération des 3 meilleurs livres
router.get('/:id', bookCtrl.getBook);// route pour la récupération d'un livre
router.post('/:id/rating', bookCtrl.ratingBook);// route pour la notation d'un livre
router.put('/:id',auth,upload.single("image"),bookCtrl.uptateOneBook);// route pour la modification d'un livre
router.delete('/:id',auth, bookCtrl.deleteBook);// route pour la suppression d'un livre


module.exports = router