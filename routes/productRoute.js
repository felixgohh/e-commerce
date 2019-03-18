const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', productController.findAll)
router.post('/', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)
router.get('/:id', productController.findById)

module.exports = router