const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name property is required'],
    },
    email: {
        type: String,
        required: [true, 'Email property is required']
    },
    password: {
        type: String,
        required: [true, 'Password property is required']
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
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

module.exports = mongoose.model('user',userSchema);
