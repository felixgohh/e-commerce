const router = require('express').Router()
const productController = require('../controllers/productController')
const jwt = require('../middlewares/jwt')
const images = require('../helpers/images')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', productController.findAll)
router.post('/', jwt.verify, isAdmin, images.multer.single('image'), images.sendUploadToGCS, productController.create)
router.put('/:id', jwt.verify, isAdmin, images.multer.single('image'), images.sendUploadToGCS, productController.update)
router.delete('/:id', jwt.verify, isAdmin, productController.delete)
router.get('/:id', jwt.verify, productController.findById)

module.exports = router