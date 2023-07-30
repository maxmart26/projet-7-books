const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       if (token == null) {
        res.status(401).send("Unauthorized");
        return;
      }
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.userId = userId
       ;
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};