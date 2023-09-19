const Shoe = require('../models/Shoe')

const asyncHandler = require('express-async-handler')

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Shoe.find().lean()
    if (!products?.length || !products) {
        return res.status(400).json({
            message: 'No products found'
        })
    }
    res.json(products)
})

const createNewProduct = asyncHandler(async (req, res, next) => {
    const { id, image, name, description, price, color} = req.body

    console.log(req.body)

    if (!id || !image || !name || !price || !color)
    {
        return res.status(400).json({message: 'Required fields are missing'})
    }
    console.log("here")
    // check duplicate
    const duplicate = await Shoe.findOne({id}).lean().exec()

    if (duplicate)
    {
        return res.status(409).json({message: "Duplicate ID"})
    }

    const product = await Shoe.create({id, image, name, description, price, color})

    if (product) { //created
        res.status(201).json({message: `New product ${id}:${name} created`})
    } else {
        res.status(400).json({message: 'Invalid product data received'})
    }
})

const getProductById = asyncHandler(async (req, res) => {
    const {id} = req.params
    if (!id) {
        res.status(400).json({message:"id is required"})
    }
    const product = await Shoe.findOne({id: id}).exec()

    if (!product) {
        res.status(400).json({message: `product ID ${id} not found`})
    }
    res.status(200).json(product)
})

const updateProduct = asyncHandler(async (req, res, next) => {
    const { id, image, name, description, price, color} = req.body

    console.log(req.body)

    if (!id || !image || !name || !price || !color)
    {
        return res.status(400).json({message: 'Required fields are missing'})
    }

    const product = await Shoe.findOne({id: id}).exec()

    if (!product) {
        return res.status(400).json({message: `Product id ${id}:${name} not found`})
    }

    // Check for duplicate
    const duplicate = await Shoe.findOne({name}).lean().exec()
    // Allow updates tp the original
    if (duplicate)
    {
        return res.status(409)
    }
    product.name = name
    product.description = description
    product.price = price
    product.color = color
    product.image = image

    const updateProduct = await product.save()

    res.json({message: `${id}:${name} updated`})
})

const deleteProduct = asyncHandler(async (req, res, next) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({message: 'Product ID Required'})
    }

    const product = await Shoe.findOne({id: id}).lean().exec()

    if (!product) {
        return res.status(400).json({message: `Product Id ${id} not found`})
    }

    console.log(product)
    
    const result = await Shoe.deleteOne({id: id})

    res.json({message: `Product ${product.name} with Id ${id} deleted`})
})

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
}