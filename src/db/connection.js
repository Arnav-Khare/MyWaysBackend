const mongoose = require('mongoose');


const DB = process.env.mongo
mongoose.connect(DB).then(()=>{
    console.log("Connection Successful")
}).catch((e)=>{
    console.log(e);
})
