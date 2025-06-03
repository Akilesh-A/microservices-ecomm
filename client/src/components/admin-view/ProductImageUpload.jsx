import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

function ProductImageUpload({imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
setImageLoadingState,imageLoadingState,currentEditedId}) {
       

    const inputRef=useRef(null);
    const handleImageFileChange=(event)=>{
        console.log(event.target.files);
        const selectedFile=event.target.files?.[0];
        if(selectedFile){
            setImageFile(selectedFile)
        }
        
    }

    const handelDragOver=()=>{

    }
    const handelDrop=(event)=>{
        event.preventDefault()
        const droppedFile=event.dataTransfer.files?.[0];
        if(droppedFile){
            setImageFile(droppedFile)
        }
        

    }
    const handelRemoveImage=()=>{
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value=""
        }

    }
//    async function uploadImageToCloudinary(){
//     uploadImageToCloudinary(true)
//     const data=new FormData();
//     data.append('my_file',imageFile)
//     const response=await axios.post('http://localhost:5000/api/admin/products/upload-image',data)
//     console.log(response);
    
//     if(response.data.success){
//         setUploadedImageUrl(response.data.result.url);
//         uploadImageToCloudinary(false)
//     }

//     }

    async function uploadImageToCloudinary() {
    setImageLoadingState(true); // ✅ fix here
    const data = new FormData();
    data.append('my_file', imageFile);

    try {
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
        console.log(response);

        if (response.data.success) {
            setUploadedImageUrl(response.data.result.url);
        }
    } catch (err) {
        console.error("Image upload failed:", err);
    } finally {
        setImageLoadingState(false); // ✅ also make sure this happens regardless of success
    }
}

    useEffect(()=>{
        if(imageFile !==null){
                uploadImageToCloudinary()
        }
    },[imageFile])

    
  return (
    <div className='w-full max-w-md mx-auto mt-4'>
        <Label className='text-lg font-semibold mb-2 block'>Upload image</Label>
        <div onDragOver={handelDragOver} onDrop={handelDrop} className={`${currentEditedId ? "opacity-60 cursor-not-allowed": ""} border-2 border-dashed rounded-lg p-4`}>
            <Input id='image-upload' type='file' ref={inputRef} onChange={handleImageFileChange} className='hidden' disable={currentEditedId}></Input>
            {
                !imageFile ? 
                <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                    <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
                    <span>Drag & drop or click to upload image</span>

                </Label>
                :
                imageLoadingState? <Skeleton className='h-10 bg-gray-100'/>:
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <FileIcon className='w-7 h-8 text-primary mr-2'/>
                    </div>
                    <p className='text-sm font-medium'>{imageFile.name}</p>
                    <Button variant='ghost' size="icon" className="text-muted-foreground hover:text-foreground" onClick={handelRemoveImage}>
                        <XIcon className='w-4 h-4'></XIcon>
                        <span className='sr-only'>Remove File</span>
                    </Button>
                </div>
            }
            
        </div>
      
    </div>
  )
}

export default ProductImageUpload
