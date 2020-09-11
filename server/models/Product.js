const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DEFAULT_PRODUCT_IMAGE} = require('../lib/constants/constants');


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    price: {
        type: Number,
        required: [true, 'The price is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    img: {
        type: String,
        default: DEFAULT_PRODUCT_IMAGE,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Product', productSchema);
