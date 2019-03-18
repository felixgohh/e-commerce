const productModel = require('../models/product')

class Controller {
    static findAll(req, res) {
        productModel
            .find({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        productModel
            .create({ ...req.body })
            .then(newProduct => {
                res.status(201).json(newProduct)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        productModel
            .findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            .then(updatedProduct => {
                res.status(200).json(updatedProduct)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        productModel
            .findByIdAndDelete(req.params.id)
            .then(deletedProduct => {
                res.status(200).json(deletedProduct)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findById(req, res) {
        productModel
            .findById(req.params.id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Controller