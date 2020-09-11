const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {DEFAULT_USER_IMAGE} = require('../lib/constants/index');


let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not valid'
};
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name property is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email property is required'],
    },
    password: {
        type: String,
        required: [true, 'Password property is required']
    },
    img: {
        type: String,
        default: DEFAULT_USER_IMAGE,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles,
        required: [true, 'Role property is required']
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

userSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

module.exports = mongoose.model('User', userSchema);
