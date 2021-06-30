const msg500 = require('../middlewares/error500');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const login = async (req, res) => {

    // todo: mejorar login. demora en el proceso para evitar bombardeo del sitio o mirar otra opcion
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Datos no validos.'
            })
        }

        // Verificar Contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Datos no validos.'
            })
        }

        // Generar el TOCKEN - JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            msg: 'Login',
            token
        })
    } catch (error) {
        console.log(error);
        msg500();
    }
}

module.exports = {
    login
};