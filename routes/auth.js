/* path: '/SSPE/login */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validatFields } = require('../middlewares/validators-campus');


const router = Router();

router.post('/', [check('email', 'el email es obligatorio y debe ser email valido').isEmail(),
check('password', 'la contrasena es obligatoria').not().isEmpty()],
  
    login)


module.exports = router;