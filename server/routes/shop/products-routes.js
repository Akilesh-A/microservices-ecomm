const express=require('express');
const {getFilteredProducts} =require('../../controllers/shop/product-controllers')

const router=express.Router();
router.get('/getproducts',getFilteredProducts)

module.exports=router