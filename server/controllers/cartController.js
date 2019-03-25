const cartModel = require('../models/cart')

class Controller {
    static findAll(req, res) {
        let condition = {}
        if (req.query.search) {
            condition = {
                userId: req.query.search
            }
        }

        cartModel
            .find(condition)
            .populate('productId')
            .populate('userId')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        cartModel
            .create({ ...req.body })
            .then(newCart => {
                res.status(201).json(newCart)
            })
            .catch(err => {
                console.log(err);
                if (err.errors.productId || err.errors.userId || err.errors.status) {
                    res.status(409).json(err)
                }
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        cartModel
            .findByIdAndUpdate(req.params.id, { ...req.body })
            .then(updatedCart => {
                res.status(200).json(updatedCart)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        cartModel
            .findByIdAndDelete(req.params.id)
            .then(deletedCart => {
                res.status(200).json(deletedCart)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findById(req, res) {
        cartModel
            .findById(req.params.id)
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Controller