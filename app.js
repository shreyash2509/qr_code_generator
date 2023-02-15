const express = require("express");
const port=process.env.port || 3000;
const app = express();
const qrcode=require("qrcode");

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public')); //this is used to access the static files like css,js,images etc.


app.set('view engine','ejs');

app.get("/",function(req,res,next){
 res.render('index')
});

app.post('/scan',function(req,res,next){
  const input=req.body.text; //here we are requesting the input from user which is being stored in the text area with name "text" under body tag
  qrcode.toDataURL(input,function(err,src){
    res.render('scan',{   //here we are sending qr code to the scan.ejs file using ejs templating engine
      qr_code:src,
    })
  });
});

app.listen(port,function(){
  console.log("server is running on port 3000.");
})