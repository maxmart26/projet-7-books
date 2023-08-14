const jwt = require('jsonwebtoken');


module.exports =  (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("token",token);
        if (token == null) {
         res.status(401).send("Unauthorized");
         return;
       }
        const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.userId = userId
        ;
        console.log("req.userId",req.userId);
       
     next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };