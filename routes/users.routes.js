/*
    Path: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controllers');
const { validator } = require('../middlewares/validator');
const { validatorJWT } = require('../middlewares/validator-jwt');

const router = Router();

router.get( '/', validatorJWT, getUsers );

router.post( '/',
    [
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El Apellido es obligatorio').not().isEmpty(),
        check('password', 'La Contraseña es obligatoria').not().isEmpty(),
        check('email', 'El Correo es obligatorio').isEmail(),
        validator
    ],
    createUser );

router.put( '/:id',
    [
        validatorJWT,
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El Apellido es obligatorio').not().isEmpty(),
        check('email', 'El Correo es obligatorio').isEmail(),
        validator
    ],
    updateUser );

 router.delete( '/:id', validatorJWT, deleteUser );





module.exports = router;