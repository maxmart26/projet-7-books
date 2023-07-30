const Books = require('../models/Book');
const {bookss} = require('../books');



/*exports.createBook = (req, res,next) => {
  const Books = req.body;
  console.log("book",Books);
};*/
exports.createBook = (req, res,next) => {
  const Book = new Books({...req.body});
  Book.save()
  .then(() => res.status(201).json({message:"ok"}))
  .catch(error => res.status(400).json({ error }));
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