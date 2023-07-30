const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');
const auth = require('../middleware/auth'); 
const {upload} = require('../multer/multer');


router.get('/', bookCtrl.getAllBook);
router.post('/', upload.single("image"), bookCtrl.createBook);
router.get('/:id', bookCtrl.getBook);
router.put('/:id',auth, bookCtrl.uptateOneBook);
router.delete('/:id',auth, bookCtrl.deleteBook);

module.exports = router