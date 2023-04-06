const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
    
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstname,
                    LNAME:lastname,
                },
            }
        ]
    };

    const jsondata = JSON.stringify(data);
    console.log(jsondata);
    const url ="https://us21.api.mailchimp.com/3.0/lists/4ad1e6f04f"
    const options = {
        method:"POST",
        auth:"backend:9742a4dea17f8d79989682373368ae29-us21"
    }

    const request=https.request(url, options, function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
            
        })
        
    })
    
    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/")
})


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

});

app.listen(process.env.PORT || '3000',function(){
    console.log("Server started at port 3000");
});
//api key
//9742a4dea17f8d79989682373368ae29-us21

//list id
//4ad1e6f04f