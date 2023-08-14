const {Book} = require('../models/Book'); // Supposons que vous ayez un modèle 'Book'
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if (token == null) {
         res.status(401).send("Unauthorized");
         return;
       }
        const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.userId = userId
        ;
        
        const bookId = req.params.id; // Supposons que vous ayez l'ID du livre dans les paramètres
       
        // Recherche du livre dans la base de données
        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        

        // Vérification si l'ID de l'utilisateur du token correspond à l'ID du créateur du livre
        if (book.userId.toString() !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized: You are not the creator of this book' });
        }
     next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };