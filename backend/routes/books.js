const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');
const auth = require('../middleware/auth'); 
const {upload} = require('../multer/multer');


router.get('/', bookCtrl.getAllBook);
router.post('/',auth, upload.single("image"), bookCtrl.createBook);
router.get('/:id', bookCtrl.getBook);
router.put('/:id',auth,upload.single("image"),bookCtrl.uptateOneBook);
router.delete('/:id',auth, bookCtrl.deleteBook);
router.get('/bestrating',bookCtrl.bestrating);

module.exports = router