const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart