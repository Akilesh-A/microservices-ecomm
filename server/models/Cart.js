const moongoose=require("mongoose");

const CartSchema= new moongoose.Schema({
    userId:{
        type : moongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    items : [{
        productId : {
            type : moongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true
        },
        quantity:{
            type:Number,
            required : true,
            min : 1
        }
    }]

},{timestamps:true})

module.exports=moongoose.model('Cart',CartSchema)