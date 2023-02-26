/* Ruta principal: /SSPE/formRegister  */
const {getForm, createForm, updateForm, deleteForm }=require('../controllers/formsRegisters')
const { Router } = require('express');
const { check } = require('express-validator');
const { validatFields } = require('../middlewares/validators-campus');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();



//Ruta obtener usuarios
router.get('/', validateJWT, getForm);

//Ruta obtener 
router.post('/', validateJWT,[check('name', 'el nombre es obligatorio').not().isEmpty(),
                 check('adress', 'la direcciones obligatoria').not().isEmpty(),
                 check('dateofbirth', 'el dia de nacimiento es  obligatoria').not().isEmpty(),
                 check('location', 'la localidad es  obligatoria').not().isEmpty(),
                 check('gender', 'el genero es  obligatoria').not().isEmpty(),
                ], validatFields, createForm);


router.put('/:id',validateJWT,updateForm);

router.delete('/:id',validateJWT,deleteForm);


module.exports = router;