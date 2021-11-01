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