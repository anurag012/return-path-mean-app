var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database.config');
mongoose.connect(database.url);
app.use(bodyParser.json());

app.use(express.static(__dirname+"/public"));
require('./models/user.model');
require('./routes')(app);


app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");

