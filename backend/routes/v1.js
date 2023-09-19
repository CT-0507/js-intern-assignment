const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.route('/api/v1/products')
    
    .get(productsController.getAllProducts)
    .post(productsController.createNewProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)
router.get('/api/v1/products/:id', productsController.getProductById)
module.exports = router