const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: String,
        required: [true, 'Price is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product