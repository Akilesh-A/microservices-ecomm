const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const User=require('../../models/User')
// register
const registerUser =async (req,res)=>{
    const {userName,email,password}=req.body;
    // console.log(userName,email,password);
    
    try{
        const checkUser=await User.findOne({email});
        if(checkUser) {
            return res.json({
                success:false,
                message:"User Alredy registered !"
            })
        }
        
        const hashPassword = await bcrypt.hash(password,12);
        // console.log(hashPassword);
        
        const newUser = new User({
            userName,email,password:hashPassword
        })

        await newUser.save()
        res.status(200).json({
            success:true,
            message:"Registration successful"

        })
        
        

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'some error occurred'

        })
        

    }

}



// login
 

const loginUser=async (req,res)=>{
    const {email,password}=req.body
    console.log(email,password);
    
    try{
        const checkUser= await User.findOne({email})
        // console.log(checkUser);
        
      if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register."
            });
        }

     const checkpasswordMatch=await bcrypt.compare(password,checkUser.password);
      if (!checkpasswordMatch) {
            return res.status(404).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        const token=jwt.sign({
            id:checkUser._id,
            role:checkUser.role,
            email:checkUser.email,
            userName:checkUser.userName

        },"CLIENT_SECRET_KEY",{expiresIn:"60m"})
        res.cookie('token',token,{httpOnly:true,secure:false}).json({
            success:true,
            message:"Logged in Successfull",
            user:{
                   userName: checkUser.userName,
                  email: checkUser.email,
                  role: checkUser.role,
                  id: checkUser._id,
               

            }
        })
        
        

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        
    }
}
// logout


const logoutUser=(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:"Logged Out Successfully"
    })
}


// auth middleware

const authMiddleware=async (req,res,next)=>{
 const token = req.cookies.token;

    if(!token){
     return res.status(401).json({
        success:false,
        message:"Unauthorised user!"
     })
    }

    try{
        const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user=decoded;
        next()

    }catch(err){
    res.status(401).json({
        success:"false",
        message:"unauthirized block"
    })

        
    }
    
}


module.exports={registerUser,loginUser,logoutUser,authMiddleware}