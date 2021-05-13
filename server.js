// Setup empty JS object to act as endpoint for all routes
projectData = {};
let data = [];
const port = 3000;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port, ()=> console.log(`Listening on port:${port}`));

// Routes
/**
 * A server-side GET route to return all data
 * @param  {} '/getData'
 * @param  {} function(req, res)
 */
app.get('/getData', function (req, res) {
    res.send(data);
  });
/**
 * A server-side POST route to save recieved data from client
 * @param  {} '/addData'
 * @param  {} function(req, res)
 */
app.post('/addData', function (req, res) {
    data.push(req.body);
  console.log(data);
  res.send({msg:"hello world"});
});