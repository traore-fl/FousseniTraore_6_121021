// IMPORTATIONS ----------
const express = require('express'); // Framework pour le développement du serveur
const mongoose = require('mongoose'); // Bibliothèque ODM pour la création des schémas
const helmet = require('helmet'); // Package pour la sécurisation des headers HTTP
const path = require('path'); // Module NodeJS pour la gestion des chemins d'accès à des fichiers
const morgan = require('morgan'); // Journaux de données des requêtes HTTP
const fs = require('fs'); // File System : gestionnaire de fichiers
require('dotenv').config(); // Module pour le chargement de variables depuis le fichier .env

// Routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


// CONNEXION A LA BASE DE DONNEES ----------
mongoose.connect(`${process.env.DATABASE}`, 
    {useNewUrlParser: true,
    useUnifiedTopology: true,}
)
.then(() => console.log('Connected to MongoDB !'))
.catch(() => console.log('Connection to MongoDB failed !'));

// CREATION DE L'APPLICATION EXPRESS ----------
const app = express();

// Activation de la protection Helmet
app.use(helmet());

// Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Configuration de morgan
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// Intégrations des routes
app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: accessLogStream }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


// EXPORTATION ----------
module.exports = app;