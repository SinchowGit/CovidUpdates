var express = require("express");
var app = express();
var request = require("request");

app.set("view engine","ejs");
app.use(express.static("public"));


app.get("/",(req,res)=>{
  request("https://api.covid19india.org/data.json",(error,response,body)=>{
    var data=JSON.parse(body);
    res.render("Covid",{data:data});
  });
});

app.get("/Contact",(req,res)=>{
  res.render("Contact")
})

app.get("/District-wise/:state",(req,res)=>{
  request("https://api.covid19india.org/state_district_wise.json",(error,response,body)=>{
    var district=JSON.parse(body);
    var state=req.params.state;
    var data2=district[state];
    res.render("DistrictWise",{data:data2,state:state});

  })
})

app.get("/About",(req,res)=>{
  res.render("About");
})

app.listen(process.env.PORT || 3000,()=>{
  console.log("server started");
})
