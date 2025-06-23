const express=require('express');
const {getFilteredProducts,getProductDetails} =require('../../controllers/shop/product-controllers')

const router=express.Router();
router.get('/getproducts',getFilteredProducts);
router.get('/getproducts/:id',getProductDetails)

module.exports=router