const bcrypt = require('bcryptjs');
const msg500 = require('../middlewares/error500');

const User = require('../models/user.model');


const getUsers = async (req, res) => {
    const users = await User.find({}, 'name last_name email country role google active'); // Filtro{}, dato a obtener
    res.json({
        ok: true,
        msg: 'get Usuarios',
        users
    })
}

const createUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if (userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El Correo ya está registrado'
            })
        }

        const user = new User(req.body);

        // Encriptar Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        await user.save();

        res.json({
            ok: true,
            msg: 'Creando Usuario',
            user
        })
    } catch (error) {
        console.log(error);
        msg500();
    }

}

const updateUser = async (req, res) => {

    // Todo: Validar token y verificar que es el usuario correcto
    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if (!userDB || !userDB.active) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizacion
        const { password, google, email, ...dataUser } = req.body;

        if (userDB.email !== email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        dataUser.email = email;

        const userUpdated = await User.findByIdAndUpdate(uid, dataUser, { new: true });

        res.json({
            ok: true,
            msg: 'update user',
            user: userUpdated
        })

    } catch (error) {
        console.log(error);
        msg500()
    }
}

const deleteUser = async (req, res) => {

    const uid = req.params.id;

    try { 

        const userDB = await User.findById( uid );

        if (!userDB || !userDB.active) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        } 

        
        
        await User.findByIdAndUpdate(uid, {active: false}, { new: true });
        // await User.findByIdAndDelete( uid ); //para borrar fisicamente en la Base de datos

        res.json({
            ok: true,
            msg: 'user deleted',
        })

    } catch (error) {
        console.log(error);
        msg500();
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}