const {Book} = require('../models/Book');
const fs = require('fs');

// middleware pour la création d'un livre
exports.createBook =  async (req, res,next) => {
  try{
    const portFromEnv = process.env.PORT || 4000;
    const file = req.file.filename;
  const stringifiedBook = req.body.book;
  const book = JSON.parse(stringifiedBook);
  ///book.image
  book.imageUrl = `http://localhost:${portFromEnv}/images/` + file;
  const result = await Book.create(book);
  res.send({ message:"livre crée"})
  }
  catch (e){
    console.error(e);
    res.status(500).send("erreur de la requete" + e.message)
  }
}
// middleware pour la récupération de tous les livres
exports.getAllBook = async (req, res,) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (e) {
    console.error(e);
    res.status(500).send("erreur:" + e.message);
  }
}
// middleware pour la récupération d'un livre
exports.getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (book == null) {
      res.status(404).send("Book not found");
      return;
    }
    res.send(book);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong:" + e.message);
  }
}
// middleware pour la modification d'un livre
exports.uptateOneBook = (req, res, next) => {
  const portFromEnv = process.env.PORT || 4000;
  const book = req.body.file;
  findBook = Book.findOne({ _id: req.params.id })
  .then(book => {
    if (req.file) {
      const filename = book.imageUrl.split('/images/');
      fs.unlink(`image/${filename}`, () => {});
      const file = req.file.filename;
      const filenames = `http://localhost:${portFromEnv}/images/` + file;
      book.imageUrl = filenames;
    }
    if (req.body.title) book.title = req.body.title;
    if (req.body.author) book.author = req.body.author;
    if (req.body.year) book.year = req.body.year;
    if (req.body.genre) book.genre = req.body.genre;
    book.save()
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
  };
// middleware pour la suppression d'un livre
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
  .then(book => {
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    // Delete the image from the server
    const filename = book.imageUrl.split('/images/');
    fs.unlink(`image/${filename}`, () => {
      Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
  }
// middleware pour la récupération des 3 meilleurs livres
exports.bestrating = async (req,res) => {
  try {
    const books = await Book.find().sort({averageRating:-1}).limit(3);
  res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("erreur:" + error.message);
  }
}
// middleware pour la notation d'un livre
exports.ratingBook = async (req,res) => {
  const id = req.params.id;
  if (id == null || id == "undefined") {
    res.status(400).send("Book id is missing");
    return;
  }
  const rating = req.body.rating;
  const userId = req.body.userId;
  try {
    const book = await Book.findById(id);//on récupère le livre
    if (book == null) {
      res.status(404).send("Book not found");
      return;
    }
    const ratingsInDb = book.ratings;//on récupère les notes du livre
    const previousRatingFromCurrentUser = ratingsInDb.find((rating) => rating.userId == userId);
    if (previousRatingFromCurrentUser != null) {
      res.status(400).send("You have already rated this book");
      return;
    }
    const newRating = { userId, grade: rating };//on crée une nouvelle note
    ratingsInDb.push(newRating);//on ajoute la nouvelle note au tableau des notes
    book.averageRating = calcul(ratingsInDb);//on calcule la moyenne des notes
    await book.save();//on sauvegarde le livre

    res.send(book);//on envoie une réponse
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong:" + e.message);
  }
}
function calcul(ratings){//fonction pour calculer la moyenne des notes
  const sum = ratings.reduce((acc, rating) => acc + rating.grade, 0);
  const average = sum / ratings.length;
  return average.toFixed(2);
  

}