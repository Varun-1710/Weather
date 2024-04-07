
const express = require("express");
const app = express();
const https = require("https");
const http = require('http');
const bodyParser = require("body-parser");

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
    
});

app.post('/',(req,res)=>{
    const obj = {};
    const cityName = req.body.CityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4485e7646158ff642702599139b7184a&units=metric`;
    var lat;
    var lon;

    https.get(url,(response)=>{

        response.on("data",(data)=>{
            const new_data = JSON.parse(data);
            console.log(new_data);
            const icon = new_data.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon+"@2x.png";
            obj.Weatherdata = new_data;
            obj.url = imageURL;
            lat = new_data.coord.lat;
            lon = new_data.coord.lon; 

            
            res.render('profile',{obj});
            
        })
    })

    
    
})



app.listen(3000,(err)=>{
    if(err) throw err;
    console.log("Listening at Port 3000");
})