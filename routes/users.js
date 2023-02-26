/* Ruta principal: api/users */

const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { check } = require('express-validator');
const { validatFields } = require('../middlewares/validators-campus');
const { validateJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Ruta obtener usuarios
router.get('/', validateJWT, getUsers);

//Ruta obtener 
router.post('/', [check('name', 'el nombre es obligatorio').not().isEmpty(),
check('password', 'la contrasena es obligatoria').not().isEmpty(),
check('email', 'el email es obligatorio y debe ser email valido').isEmail(),
    validatFields
], createUser);


router.put('/:id', [
    validateJWT,
check('name', 'el nombre es obligatorio').not().isEmpty(),
check('email', 'el email es obligatorio y debe ser email valido').isEmail(),
    validatFields
], updateUser);

router.delete('/:id', validateJWT, deleteUser);


module.exports = router;