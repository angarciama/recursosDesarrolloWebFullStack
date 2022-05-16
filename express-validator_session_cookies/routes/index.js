const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');
const { body, check} = require('express-validator');


/* GET home page. */
router.get('/', controller.index);
router.post('/', [
  check('name').isLength({min: 1}).withMessage('Debe ingresar un nombre'),
  check('email').isEmail().withMessage('Debe ingresar un email válido'),
  check('color').isLength({min: 1}).withMessage('Debe ingresar un color'),
  body('age').isNumeric().withMessage('Ingrese un numero')

] ,controller.store);

router.get('/borrar', controller.borrar);

module.exports = router;
