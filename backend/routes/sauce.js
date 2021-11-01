// IMPORTATIONS ----------
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');



// ROUTES ----------
router.post('/', auth, sauceCtrl.createSauce);
router.post('/:id/like',auth,  sauceCtrl.rateSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);


// EXPORTATION ----------
module.exports = router;