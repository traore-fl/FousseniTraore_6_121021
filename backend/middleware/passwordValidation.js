const passwordSchema = require('../models/password');

// Vérification de la conformité du mot de passe
module.exports = (req, res, next) => {
    // Si le mot de passe saisi ne correspond pas au schéma
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message: "Le mot de passe est invalide. Il doit contenir entre 8 et 30 caractères dont au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 symbole, et ne doit pas contenir d'espace."});
        console.log(passwordSchema.validate(req.body.password, { list: true }));
    } 
    // Si le mot de passe correspond au schéma
    else {
        next()
    }
}