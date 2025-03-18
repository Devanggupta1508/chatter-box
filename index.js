const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const methodOveride = require("method-override")


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(methodOveride("_method"));

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ChatterBox");
}
//see all chats index.ejs
app.get("/chats",async(req,res) => {
 let chats = await Chat.find();
 console.log(chats);
 res.render("index.ejs",{chats});
});

//new route
app.post("/chats/new",async(req,res)=>{
    res.render("new.ejs");
});


//create new chats
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new Chat ({
        from: from,
        to:to,
        msg:msg,
        // created_at: new Date()
    });
    newChat
    .save()
    .then((res)=>{
        console.log("chat was saved");
    })

.catch((err)=>{
    console.log(err)
});
res.redirect("/chats");
});

//edit routes 

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}= req.params;
    let chat =await  Chat.findById(id);
    res.render("edit.ejs",{chat});
    
});

//edit update in database 
app.put("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let{msg:newMsg}=req.body;
    let update_chat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true},{new:true }
    
    );
    console.log(update_chat);
    res.redirect("/chats");

});

//delete chat routes 

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deleted_chat = await Chat.findByIdAndDelete(id)
console.log(deleted_chat,"this id chat is deleted");
res.redirect("/chats");
});



app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});