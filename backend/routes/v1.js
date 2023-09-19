const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.route('/api/v1/products')
    
    .get(productsController.getAllProducts)
    .post(productsController.createNewProduct)
router.get('/api/v1/products/:id', productsController.getProductById)
router.put('/api/v1/products/:id', productsController.updateProduct)
router.delete('/api/v1/products/:id', productsController.deleteProduct)
module.exports = router