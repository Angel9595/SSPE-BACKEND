/* Ruta principal: /SSPE/uploads  */
const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { fileUpload, returnImage } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.use(expressfileUpload());



//Ruta 
router.put('/:tipo/:id', validateJWT, fileUpload);

//Ruta:
router.get('/:tipo/:image', returnImage );


module.exports = router;