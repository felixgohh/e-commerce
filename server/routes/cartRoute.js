const router = require('express').Router()
const cartController = require('../controllers/cartController')
const jwt = require('../middlewares/jwt')
const authorized = require('../middlewares/authorized')

router.get('/', jwt.verify, cartController.findAll)
router.post('/', jwt.verify, cartController.create)
router.put('/:id', jwt.verify, authorized, cartController.update)
router.delete('/:id', jwt.verify, authorized, cartController.delete)
router.get('/:id', jwt.verify, cartController.findById)

module.exports = router