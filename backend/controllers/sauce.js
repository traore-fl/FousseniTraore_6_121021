// IMPORTATIONS ----------
const Sauce = require('../models/sauce'); // Schéma Sauce
const fs = require('fs'); // File System : gestionnaire de fichiers


// ROUTES ----------

// POST : Ajouter une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then(() => res.status(201).json({message: "Sauce enregistrée !"}))
    .catch(error => res.status(400).json({error}));
}

// POST : Liker/Disliker une sauce
exports.rateSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        const like = req.body.like;
        const user = req.body.userId;
        // Si l'utilisateur like la sauce
        if (like === 1) {
            if (!sauce.usersLiked.includes(user)) {
                sauce.likes++;
                sauce.usersLiked.push(user);
            }
        }
        // Si l'utilisateur dislike la sauce
        if (like === -1) {
            if (!sauce.usersDisliked.includes(user)) {
                sauce.dislikes++;
                sauce.usersDisliked.push(user);
            }
        }
        // Si l'utilisateur retire son évaluation
        if (like === 0) {
            // S'il retire un like
            if (sauce.usersLiked.includes(user)) {
                sauce.likes--;
                const index = sauce.usersLiked.indexOf(user);
                sauce.usersLiked.splice(index, 1);
            }
            // S'il retire un dislike
            if (sauce.usersDisliked.includes(user)) {
                sauce.dislikes--;
                const index = sauce.usersDisliked.indexOf(user);
                sauce.usersDisliked.splice(index, 1);
            }
        }
        // On sauvegarde les changements dans la base de données
        Sauce.updateOne(
            {_id: req.params.id},
            {
            likes: sauce.likes,
            dislikes: sauce.dislikes,
            usersLiked: sauce.usersLiked,
            usersDisliked: sauce.usersDisliked,
            _id: req.params.id
            }
        )
        .then(()=> res.status(200).json({message: "L'évaluation de la sauce a bien été mise à jour !"}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(404).json({error}));
}


// PUT : Modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne(
        {_id: req.params.id},{...sauceObject, _id: req.params.id},{ runValidators: true }
    )
    .then(()=> res.status(200).json({message: "Sauce modifiée !"}))
    .catch(error => res.status(400).json({error}));
}

// DELETE : Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: "Sauce supprimée !"}))
            .catch(error => res.status(400).json({error}));
        })
    })
    .catch(error => res.status(500).json({error}));
};

// GET : Afficher les sauces ou une sauce spécifique
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};