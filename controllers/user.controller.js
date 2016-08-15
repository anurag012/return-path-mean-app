/**
 * Created by Anurag on 8/13/2016.
 */
var mongoose = require('mongoose');
User = mongoose.model('User');

exports.findAll = findAll;
exports.add = add;
exports.update = update;
exports.remove = remove;

function findAll(req,res) {

    User.find({},function(err, results) {
        if(err) res.status(404).send("Not Found");
        console.log(results);
         res.send(results);
    });
};

function update(req,res) {
    var id = req.params.id;
    var updates = req.body;
    User.update({_id:id}, updates,
        function (err, user) {
            if (err) return handleError(res,"User not found with id : "+id,"Failed to update contact",400);

            res.send(user);
        });
};


function add(req,res) {
    User.create(req.body, function (err, user) {
        if (err) return handleError(res, "Email id already exists", "Unable to add user.", 400);
        console.log(user);
         res.send(user);
    });

}

function remove(req,res) {
    var id = req.params.id;
    User.remove({'_id':id},function(err, result) {
        if(err) return handleError(res, "user not found with id : "+id, "Cannot delete User.",400);
            res.send(result);
    });
}

function handleError(res,reason,message,code) {
    res.status(code || 500).send({"error":message, "reason":reason});
}



