// v8 and Nashorn have different ideas about errors
if (!process.versions.hasOwnProperty("v8")) {
    require('./error.extensions.js');
}

var express = require('express');
    path    = require('path');
    routes  = require('./routes');

var app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('*', routes.index);

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});
