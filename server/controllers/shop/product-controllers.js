const Product =require('../../models/Product');

const getFilteredProducts = async(req,res)=>{
    try{

        const products = await Product.find({})
        res.status(200).json({
            success:true,
            data:products
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"some error occured"
        })
        
    }

}

module.exports={getFilteredProducts}