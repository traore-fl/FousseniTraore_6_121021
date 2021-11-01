// IMPORTATION ----------
const jwt = require('jsonwebtoken');


// MIDDLEWARE DE L'AUTHENTIFICATION ----------
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token envoyé
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // On compare le token envoyé à celui encodé
        const userId = decodedToken.userId;
        // Si l'ID utilisateur ne correspond pas
        if(req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } 
        // Si l'ID utilisateur correspond
        else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request !')
        });
    }
}