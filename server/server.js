

const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const authRouter=require("../server/routes/auth/authRoutes");
const adminProuductRouter=require("../server/routes/admin/products-routes")
mongoose.connect('mongodb+srv://akileshanand21:Wt0IKBE3lULspH3F@mern-microservice.uo9efbk.mongodb.net/').then(()=>{
    console.log("mongo connected");
    
}).catch((err=>{
    console.log(err);
    
}))
const app=express()

const PORT=process.env.PORT || 5000;

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:[
        "Content-Type",
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/admin/products',adminProuductRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})