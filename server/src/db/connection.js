const mongoose = require('mongoose');


const DB = 'mongodb+srv://HashiraFlame:mohil%4051@cluster0.pvkn7.mongodb.net/Users?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{
    console.log("Connection Successful")
}).catch((e)=>{
    console.log(e);
})