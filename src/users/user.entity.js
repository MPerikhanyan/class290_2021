const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const utils = require('..commons/util')

const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true

    },

    role: {
        type: String,
        enum:[utils.CUSTOMER, utils.ADMIN],
        default: utils.DEFAULT_ROLE
    },

    locked:{
        type: Boolean,
        required: true,
        default: false
        
    },
    failedAttemps:{
        type: Number,
        required: true,
        default: 0,
        max: 3

    }

}, { collection: 'users' });

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, salt);
    }

    next();
})

module.exports = mongoose.model('User', schema);