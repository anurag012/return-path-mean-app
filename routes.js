/**
 * Created by Anurag on 8/13/2016.
 */

module.exports = function (app) {

    var users = require('./controllers/user.controller');
    app.get('/users',users.findAll);
    app.post('/users',users.add);
    app.put('/users/:id',users.update);
    app.delete('/users/:id',users.remove);

}

