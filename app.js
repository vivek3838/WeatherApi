const express = require("express");

const https = require("https");

const bodyParser = require("body-Parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {

  // console.log(req.body.CityName);

  const query = req.body.CityName;
  const apiKey = "b64541b74dff7dc2b0f0b7aa01435be6";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp
      const weatherdiscrption = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The currently temp in "+ query + " is " + weatherdiscrption + "</p>");
      res.write("<h1>The temp in "+ query + " is " + temp + " degree Celcius. </h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})

//
// const query = "london";
// const apiKey = "b64541b74dff7dc2b0f0b7aa01435be6";
// const unit = "metric";
//
//   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units="+ unit;
//
//   https.get(url, function(response) {
//     console.log(response.statusCode);
//
//     response.on("data", function(data) {
//       // console.log(data);
//       const weatherdata = JSON.parse(data);
//       // console.log(weatherdata);
//
//       const temp = weatherdata.main.temp
//
//       const weatherdiscrption = weatherdata.weather[0].description
//
//       const icon = weatherdata.weather[0].icon
//
//       const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
//
//
//
//       // console.log(weatherdiscrption);
//
//       // res.send("<h1>The temp in london is " + temp + " degree Celcius</h1>");
//       res.write("<p>The temp in london is " + weatherdiscrption + "</p>" );
//       res.write("<h1>The temp in london is " + temp + " degree Celcius</h1>");
//       res.write(" <img src="+imageURL+">");
//       res.send();
//
//       // const object = {
//       //   name: "vivrk",
//       //   title: "gupta"
//       // }
//       // JSON.stringify()
//     });
//   });
//   // res.send("Server is up & running")
