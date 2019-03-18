const router = require('express').Router()
const cartController = require('../controllers/cartController')

router.get('/', cartController.findAll)
router.post('/', cartController.create)
router.put('/:id', cartController.update)
router.delete('/:id', cartController.delete)
router.get('/:id', cartController.findById)

module.exports = router