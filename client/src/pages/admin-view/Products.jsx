import AdminProductTile from '@/components/admin-view/AdminProductTile';
import ProductImageUpload from '@/components/admin-view/ProductImageUpload';
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast';
import { addProductFormElements } from '@/config';
import { fetchAllProducts,addNewProduct, editProduct } from '@/store/admin/products-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialState={
  image:null,
  title:"",
  description:"",
  category:"",
  brand:'',
  price:'',
  salePrice:'',
  totalStock:''
}





function Products() {
  const [openCreateProductDialog,setOpenCreateProductDialog]=useState(false);
  const [formData,setFormData]=useState(initialState);
  const [imageFile,setImageFile]=useState(null);
  const [uploadedImageUrl,setUploadedImageUrl]=useState('');
  const [imageLoadingState,setImageLoadingState]=useState(false);
  const [currentEditedId,setCurrentEditedId]=useState(null)
  const {productList}=useSelector(state=>state.adminProducts)
  const dispatch=useDispatch()
  const onSubmit = (event) => { 
    event.preventDefault();

    currentEditedId !==null ? dispatch(editProduct({id:currentEditedId,formData})).then((data)=>{
      console.log(data,"edited datat");
      if(data.payload.success){
         dispatch(fetchAllProducts())
         setFormData(initialState);
         setOpenCreateProductDialog(false);
         setCurrentEditedId(null)


      }
      
    }):

    dispatch(addNewProduct({ ...formData, image: uploadedImageUrl }))
    .then(unwrapResult) // <- this unwraps the actual payload
    .then((data) => {
      console.log(data);
      
      if(data){
        dispatch(fetchAllProducts())
        setFormData(initialState);
        setImageFile(null);
        toast({
          title:"Product added successfully"
        });
        setOpenCreateProductDialog(false)

      }
    })
    .catch((error) => {
      console.error('Failed to add product:', error);
    });

  };
useEffect(()=>{
dispatch(fetchAllProducts())

},[dispatch])
// console.log(productList,uploadedImageUrl,"productList");
console.log(formData);



  return (
   <Fragment>
    <div className='mb-5 w-full flex justify-end'>
      <Button onClick={()=>setOpenCreateProductDialog(true)} >Add New Product</Button>
    </div>
    <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
      { productList &&  productList.length > 0 ?
      productList.map(productItem=><AdminProductTile setFormData={setFormData} setOpenCreateProductDialog={setOpenCreateProductDialog} setCurrentEditedId={setCurrentEditedId} product={productItem}/>):null
      
    }
  

    </div>
       <Sheet open={openCreateProductDialog} onOpenChange={()=>{setOpenCreateProductDialog(false);setFormData(initialState),setCurrentEditedId(null)}
      } >
        <SheetContent side="right" className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ==null ?"Add New Product":"Edit Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} currentEditedId={currentEditedId !==null}/>

          <div className='py-6'>
            <Form formControls={addProductFormElements} formData={formData} setFormData={setFormData}  onSubmit={onSubmit} buttonText={currentEditedId==null? "Add":"Edit"}></Form>

          </div>
      
        </SheetContent>
        
      </Sheet>
   </Fragment>
  )
}

export default Products
