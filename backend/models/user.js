// IMPORTATIONS ----------
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// SCHEMA ----------
const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true, 
        uniqueCaseInsensitive: true, 
        lowercase: true,
        //match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Le format de l'adresse e-mail est incorrect."]
    },
    password: {
        type: String, 
        required: true
    }
})

// Validation de champs uniques
userSchema.plugin(uniqueValidator);

// EXPORTATION ----------
module.exports = mongoose.model('User', userSchema);
