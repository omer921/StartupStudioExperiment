var express = require('express');
var request = require('request');
var Amadeus = require('amadeus');
var API = express();
// API.use(express.static('../node_modules/bootstrap/dist'));
var amadeus = new Amadeus({
  clientId: 'r3GVV5gr9Q7YxrQa5on76szNGsNMqcRw',
  clientSecret: 'tJIGeElqCCNvTrGd'
});


API.get('/', function(req, res) {
  res.render("search.ejs")
});

API.get('/dashboard/:airline/:number', function(req, res) {
  console.log("here", req.params)
  var links= "https://flightaware.com/live/flight/"+req.params.airline+req.params.number
  res.render("dashboard.ejs", {url:links})
});

API.get('/search/', function(req, res) {

  var airline = req.query.airline
  var origin = req.query.origin
  var destination = req.query.destination
  var confirmation = req.query.confirmation
  console.log(airline, destination, confirmation)
  // amadeus.referenceData.urls.checkinLinks.get({
  //   airlineCode: 'BA'
  // }).then(function(response){
  //   console.log(response.data[0].href);
  // }).catch(function(responseError){
  //   console.log(responseError.code);
  // });

  amadeus.shopping.flightOffers.get({
    origin: origin,
    destination: destination,
    departureDate: '2019-05-15'
  }).then(function(response){
      res.render("index.ejs", {response:response.data})
    console.log(response.data[0].offerItems[0].services[0].segments[0]);
  }).catch(function(responseError){
    console.log(responseError.code);
  });

});

API.listen(8081, function() {
  console.log('Host Running');
  console.log("Running on port 8081");
});
