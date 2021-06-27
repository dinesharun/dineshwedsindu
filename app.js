'use strict';

/* Import the required modules */
const express = require('express');

/* Get the express app */
const app = express();

/* Configure static directories */
app.use("/css", express.static(__dirname + '/static/css'));
app.use("/imgs", express.static(__dirname + '/static/imgs'));
app.use("/invi", express.static(__dirname + '/static/invi'));
app.use("/scripts", express.static(__dirname + '/static/scripts'));

/* For the favicon */
app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/favicon.ico');
});

/* For root route to home page */
app.get('/home.htm', (req, res) => {
  res.sendFile(__dirname + '/static/home.htm');
});

/* For root route to home page */
app.get('/map.htm', (req, res) => {
  res.sendFile(__dirname + '/static/map.htm');
});

/* For root route to home page */
app.get('/tour.htm', (req, res) => {
  res.sendFile(__dirname + '/static/tour.htm');
});

/* For root route to home page */
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/static/index.htm');
});

/* Get the port and set listening */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

/* Export our app */
module.exports = app;
