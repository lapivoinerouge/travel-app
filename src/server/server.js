//dotenv
const dotenv= require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
trips = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8000;
const server = app.listen(port, function() {
    console.log('server running on port:' + port);
});

//GET route
app.get('/all', function(req, res) {
    res.send(trips);
});

//POST route
app.post('/add', function(req, res) {
    let newData = req.body;
    let newEntry = {
        latitude: newData.latitude,
        longitude: newData.longitude,
        start: newData.start,
        end: newData.end,
        city: newData.city,
        country: newData.country,
        photoUrl: newData.photoUrl,
        description: newData.description,
        temperature: newData.temperature
    };
    console.log(newEntry);
    trips.push(newEntry);
});

export { app }