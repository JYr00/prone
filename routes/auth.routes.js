/*
    Path: /api/login
*/
const { Router } = require('express'); 
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controllers');
const { validator } = require('../middlewares/validator');

const router = Router();

router.post('/',
    [
        check('email', 'El Correo es obligatorio').isEmail(),
        check('password', 'La Contraseña es obligatoria').not().isEmpty(),
        validator
    ],
    login
)



module.exports = router;