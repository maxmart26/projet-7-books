const {Book} = require('../models/Book');


exports.createBook =  async (req, res,next) => {
  const file = req.file.filename;
  const stringifiedBook = req.body.book;
  const book = JSON.parse(stringifiedBook);
  book.imageUrl = file;
  try{
  const result = await Book.create(book);
  res.send({ message:"livre crée"})
  }
  catch (e){
    console.error(e);
    res.status(500).send("erreur de la requete" + e.message)
  }
}

exports.getAllBook = async (req, res,) => {
  try {
    const books = await Book.find();
    books.forEach((book) => {
      book.imageUrl = "http://localhost:4000/images/" + book.imageUrl;
    });
    res.send(books);
  } catch (e) {
    console.error(e);
    res.status(500).send("erreur:" + e.message);
  }
}

exports.getBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    if (book == null) {
      res.status(404).send("Book not found");
      return;
    }
    book.imageUrl = "http://localhost:4000/images/" + book.imageUrl;
    res.send(book);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong:" + e.message);
  }
}

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