const mongoose=require("mongoose");


//=================================For connecting locally to compass use this
// mongoose.connect("mongodb://127.0.0.1:27017/userdb").then(()=>{
//     console.log("Database connected")
// }).catch((error)=>{
//     console.log(`could not connected to database the error is ${error}`)
// });

// ======================for connecting to mongodb atlas cloud use this
const mongoAtalasUrl="mongodb+srv://raj:test123@cluster0.b5kws.mongodb.net/newdb"
mongoose.connect(mongoAtalasUrl,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Database connected")
}).catch((error)=>{
    console.log(`could not connected to database the error is ${error}`)
});


// const User=require("./model/User");
