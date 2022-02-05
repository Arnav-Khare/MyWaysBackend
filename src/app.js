const express = require("express")
require("../src/db/connection");
const app = express();
const Register = require("../src/models/models");
const Blogs = require("../src/models/blogsModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 6001
const cookieParser = require("cookie-parser")


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extendend:false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const auth = async (req,res,next)=>{
    try{
       const token = req.cookies.jwt;
       const verifyuser = jwt.verify(token ,'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjkl')
       console.log(verifyuser) ;
       res.redirect("https://www.google.com");
    }catch(error){
        next();
    }
}
app.get('/',(req,res)=>{
    res.send("Hello form the server");
})

app.post('/register',async (req,res)=>{
        try{
            console.log(req.body)
        const hashValue = await bcrypt.hash(req.body.password,10);
        const userData = new Register({
            fullName:req.body.name,
            email:req.body.email,
            phoneNumber:req.body.phonenumber,
            password:hashValue,
            campusId:req.body.campusId,
        })

        // const token = await userData.generateAuthToken();
        // res.cookie("jwt",token,{
        //     expires:new Date(Date.now() + 90000),
        //     httpOnly:true 
        // })
        const registerId = await userData.save();
        console.log(registerId)
        res.send(registerId)
        }catch{
          res.sendStatus(401);  
        }
})

app.post('/signIn',auth,(req,res)=>{
    console.log('SignIn')
    console.log(req.body)
})

app.post('/login',auth,async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await Register.findOne({email:email})
        const isMatch = await bcrypt.compare(password,user.password)

        const token = await user.generateAuthToken();
        res.cookie("jwt",token,{
            expires:new Date(Date.now() + 50000),
            httpOnly:true 
        })
        
        if(isMatch){
            res.send(user)
        }else{
            res.sendStatus(401)
        }
    }
    catch(err){
        console.log("Error")
    }

})

app.post('/update',async (req,res)=>{
    const id = req.body.id
   await Register.findOneAndUpdate({_id: id}, {$push: {blogs: {title:req.body.title,author:req.body.name,content:req.body.desc}}});
    const blogData = new Blogs({
        title:req.body.title,
        author:req.body.name,
        content:req.body.desc,
        image:"",
    })

    await blogData.save();
})

app.post('/getBlogs',async(req,res)=>{
    const id = req.body.id;
    const userBlogs = await Register.findOne({_id:id});
    res.send(userBlogs.blogs)
})
app.get('/getAllBlogs',async(req,res)=>{
    const all = await Blogs.find();
    res.send(all)
})
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
