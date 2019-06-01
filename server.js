// dependencies
const express = require('express');
const bParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const eHandle = require('express-handlebars');

let PORT = process.env.PORT || 3000;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/news_scraper';

// initialize express
const app = express();

// use morgan logger for logging requests
app.use(logger('dev'));
// use body-parser for handling form submissions
app.use(bParser.urlencoded({extended: true}));
// set static directory
app.use(express.static('public'));
// Set Handlebars as the default templating engine
app.engine('handlebars', eHandle({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// database configuration
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {userMongoClient: true});

// check connection status
let db = mongoose.connection;
db.on('error', (error)=>{
    console.log(`Connection error ${error}`);
});

require('./routes/routes.js')(app);

// start server
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
});

// // Dependencies
// var express = require("express");
// var mongojs = require("mongojs");
// var handlebars = require("handlebars");
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Initialize Express
// var app = express();

// // Database configuration
// var databaseUrl = "walrus";
// var collections = ["article"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// // Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// // Retrieve data from the db
// app.get("/all", function(req, res) {
//   // Find all results from the scrapedData collection in the db
//   db.scrapedData.find(function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });

// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
//   // Make a request via axios for the news section of `ycombinator` https://news.ycombinator.com/
//   axios.get("https://thewalrus.ca/category/society/environment/").then(function(response) {
//     // Load the html body from axios into cheerio
//     var $ = cheerio.load(response.data);
//     // For each element with a "title" class
//     $("h3").each(function(i, element) {
//       // i = 0
//       // i = 1;
//       // Save the text and href of each link enclosed in the current element
//       // <a href="https://example.com">Example</a>
//       var title = $(element).children("a").text();
//       var link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedData db
//         db.scrapedData.insert({
//           title: title,
//           link: link
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });


// // Listen on port 3000
// app.listen(3000, function() {
//   console.log("App running on port 3000!");
// });