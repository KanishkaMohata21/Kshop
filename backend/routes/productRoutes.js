import express from 'express';
import {createProduct,getProducts,getOneProducts,deleteproduct,updateProduct,payment} from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router();

router.post('/createproduct',formidable(), createProduct)
router.get('/getproducts', getProducts)
router.get('/getproducts/:id', getOneProducts)
router.delete('/deleteproduct/:id', deleteproduct)
router.post('/updateproduct/:id',formidable(), updateProduct)
router.post('/payment',payment)

export default router