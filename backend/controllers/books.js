const {Book} = require('../models/Book');
const {bookss} = require('../books');


exports.createBook =  async (req, res,next) => {
  const file = req.file;
  const stringifiedBook = req.body.book;
  const book = JSON.parse(stringifiedBook);
  book.imageUrl = file.path;
  try{
  const result = await Book.create(book);
  res.send({ message:"livre crée"})
  }
  catch (e){
    console.error(e);
    res.status(500).send("erreur de la requete" + e.message)
  }
}

exports.getAllBook = (req, res,) => {
    res.send(bookss);
  };

exports.getBook = (req, res, next) => {
    Books.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  };

exports.uptateOneBook = (req, res, next) => {
    Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteBook = (req, res, next) => {
    Books.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }