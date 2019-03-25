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
        let objCreate = {
            image: req.file.cloudStoragePublicUrl,
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        }

        productModel
            .create(objCreate)
            .then(newProduct => {
                res.status(201).json(newProduct)
            })
            .catch(err => {
                if (err.errors.name || err.errors.price || err.errors.image || err.errors.stock) {
                    res.status(409).json(err.message)
                } else {
                    res.status(500).json(err)
                }
            })

        /** 
        UN-COMMAND THIS IF YOU WISH TO RUN THE TEST
        productModel
            .create({ ...req.body })
            .then(newProduct => {
                res.status(201).json(newProduct)
            })
            .catch(err => {
                if (err.errors.name || err.errors.price ||err.errors.image || err.errors.stock) {
                    res.status(409).json(err.message)
                } else {
                    res.status(500).json(err)
                }
            })
        */
    }

    static update(req, res) {
        let objUpdate = {}
        if (req.file !== undefined) {
            objUpdate = {
                image: req.file.cloudStoragePublicUrl,
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock
            }
        } else {
            objUpdate = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock
            }
        }

        productModel
            .findByIdAndUpdate(req.params.id, objUpdate, { new: true })
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