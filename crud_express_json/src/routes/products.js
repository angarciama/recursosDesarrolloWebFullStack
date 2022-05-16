// ************ Require's ************
const express = require('express');
const router = express.Router();

const multer = require('multer');

// ************ Multer ************
var storage = multer.diskStorage({
    destination: (req, file, cb) => cb (null, 'public/images/products'),
    filename: (req, file, cb) => cb(null, Date.now + '-' + file.originalname)
});

var upload = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
//A single se le pasa el input creado en el archivo .ejs
router.get('/', upload.single('image'), productsController.index); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', productsController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.patch('/edit/:id', upload.single('image'), productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
