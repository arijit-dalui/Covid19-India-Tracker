
//Utilitites

const express = require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app = express();
var vara="";

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){


const url = process.env.API_URL;

  var request = https.request(url,function(response){
    var chunks = []
    response.on("data",function(chunk){
      chunks.push(chunk)
    })
    response.on("end",function(chunk){
      var body = Buffer.concat(chunks)

      const data= JSON.parse(body)


      res.render("home",{total: data.data.summary.total,death: data.data.summary.deaths,regional: data.data.regional,recovered: data.data.summary.discharged,statedata: vara})
      vara="";
    })
    response.on("error",function(error){
      console.log(error);
    })
  })
  request.end()

});

app.post("/",function(req,res){
  vara = req.body.textfield;
  //console.log(vara);
  res.redirect("/");

})



app.listen(process.env.PORT || 3000,function(){
  console.log("Server running at port 3000");
});
