const mongoose = require('mongoose')

const  blogsSchema = new mongoose.Schema(
    {
        title:{type:String},
        author:{type:String},
        content:{type:String},
        image:{type:String},
    }
)

blogsSchema.methods.createBlog = async function(data){
    try{
        console.log(data)
        this.blogs = this.blogs.concat({data})
        await this.save();
    }catch{
        console.log('Error Message in token')
    }
}
const Blogs = new mongoose.model("blogs",blogsSchema)

module.exports = Blogs