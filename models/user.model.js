const { Schema, model } = require('mongoose');

const UserShema = Schema({

    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateBirth: {
        type: Date,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    phone: {
        type: String,
        required: true
    },  
    img: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true,
    },
})

UserShema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;

    return object
})

module.exports = model( 'User', UserShema );