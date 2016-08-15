var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database.config');
mongoose.connect(database.url);
app.use(bodyParser.json());

app.use('/api/v1',express.static(__dirname+"/public"));
require('./models/user.model');
require('./routes')(app);


app.listen(process.env.port || 3000);
console.log("Listening on port 3000");

