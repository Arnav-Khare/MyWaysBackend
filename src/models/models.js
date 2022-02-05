const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");

const  userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    campusId:{
        type:String,
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }],
    blogs:[{
        title:{type:String},
        author:{type:String},
        content:{type:String},
        image:{type:String},
    }]
})
userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},"qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjkl");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token
    }catch{
        console.log('Error Message in token')
    }
}
userSchema.methods.createBlog = async function(data){
    try{
        console.log(data)
        this.blogs = this.blogs.concat({data})
        await this.save();
    }catch{
        console.log('Error Message in token')
    }
}
const Register = new mongoose.model("User",userSchema);

module.exports = Register;