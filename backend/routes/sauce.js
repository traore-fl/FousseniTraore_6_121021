// IMPORTATIONS ----------
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');



// ROUTES ----------
router.post('/', sauceCtrl.createSauce);
router.post('/:id/like', sauceCtrl.rateSauce);
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);


// EXPORTATION ----------
module.exports = router;