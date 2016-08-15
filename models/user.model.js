/**
 * Created by Anurag on 8/13/2016.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    city: String,
    state: String
    
});

var User = mongoose.model('User',userSchema);

module.exports = User;


