const Cart = require('../../models/Cart');
const Product = require('../../models/Product')


const addToCart = async(req,res)=>{
    try{
        const {userId,productId,quantity}=req.body
        if(!userId || !productId || !quantity <=0){
            return res.status(404).json({
                success:false,
                message:"Invalid data"
            })
        }
        const product =await Product.find(productId);

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"

            })
        }

        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,items:[]})
        }
        const findCurrentProductIndex= cart.items.findIndex(item=>item.productId.toString()==productId);
        if(findCurrentProductIndex===-1){
            cart.items.push({productId,quantity})
        }else{
            cart.items[findCurrentProductIndex].quantity+=quantity
        }
        await  cart.save()
        res.status(200).json({
            success:true,
            data:cart
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"not added"
        })
        
    }
}

const fetchCartItems = async(req,res)=>{
    try{

        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"user id is mandatory"
            })
        }
        const cart= await Cart.findOne({userId}).populate({
            path:'item.productId',
            select:"image title price salePrice"
        })
        if(!cart){
            return req.status(404).json({
                success:false,
                message:"cart not found"
            })
        }
        

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"not added"
        })
        
    }
}

const updateCartItemQty = async(req,res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"not added"
        })
        
    }
}
const deleteCartItem = async(req,res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"not added"
        })
        
    }
}

module.exports={addToCart,updateCartItemQty,deleteCartItem,fetchCartItems}