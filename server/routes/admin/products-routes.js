const express=require('express');
const {handelImageUpload,addProduct,editProduct,fetchAllProduct,deleteProduct}=require('../../controllers/admin/product-controllers');


const {upload}=require('../../helpers/cloudinary');

const router=express.Router();
router.post("/upload-image",upload.single("my_file"), handelImageUpload);
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/get',fetchAllProduct);

module.exports=router
 