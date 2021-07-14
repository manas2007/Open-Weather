
// jshint esversion:6

  const express = require('express');
  const https = require("https");
  const bodyParser = require("body-parser");
  const rp = require("request-promise");

  const app = new express();


  app.use(bodyParser.urlencoded({extended:true}));
  app.use(express.static("public"));



  app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});

  app.post("/",function(req,res)
{
  const city = req.body.cityName;
  const id = "ae2e85f7b57f090c3d9b147cc17c6a56";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+id;

  https.get(url, function(response)
  {
    console.log(response.statusCode);

    response.on("data",function(data)
  {
      const weatherforecast = JSON.parse(data);
      const temperature = weatherforecast.main.temp;
      const des = weatherforecast.weather[0].description;
      const image = weatherforecast.weather[0].icon;

      res.write("<h1>The temperature is "+temperature+"degrees celcius. It's "+des+" currently</h1>");
      res.send();

  });

  });
});





  app.listen(3000, function()
{
    console.log("Server started at pot 3000");
});
