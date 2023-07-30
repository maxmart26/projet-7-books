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
  const book = JSON.parse(req.body.book);
  const newBook = {};
    if (book.title) newBook.title = book.title;
    if (book.author) newBook.author = book.author;
    if (book.year) newBook.year = book.year;
    if (book.genre) newBook.genre = book.genre;
    if (req.file != null) newBook.imageUrl = req.file.filename;
    console.log("nouveau livre:",newBook);
    Book.updateOne({ _id: req.params.id }, {...newBook, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.bestrating = async (req,res) => {
  try {
    const books = await Book.find().sort({averageRating:-1}).limit(3);
  books.forEach((book) => {
    book.imageUrl = "http://localhost:4000/images/" + book.imageUrl;
  });
  res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("erreur:" + error.message);
  }
}

exports.ratingBook = async (req,res) => {
  const id = req.params.id;
  if (id == null || id == "undefined") {
    res.status(400).send("Book id is missing");
    return;
  }
  const rating = req.body.rating;
  const userId = req.body.userId;
  try {
    const book = await Book.findById(id);
    if (book == null) {
      res.status(404).send("Book not found");
      return;
    }
    const ratingsInDb = book.ratings;
    const previousRatingFromCurrentUser = ratingsInDb.find((rating) => rating.userId == userId);
    if (previousRatingFromCurrentUser != null) {
      res.status(400).send("You have already rated this book");
      return;
    }
    const newRating = { userId, grade: rating };
    ratingsInDb.push(newRating);
    book.averageRating = calcul(ratingsInDb);
    await book.save();
    res.send("Rating posted");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong:" + e.message);
  }
}
function calcul(ratings){
  const sum = ratings.reduce((acc, rating) => acc + rating.grade, 0);
  return sum / ratings.length;
}