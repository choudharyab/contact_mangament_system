var express = require('express');
var bodyParser =  require('body-parser');
var path = require('path');
var keys = require('../init/keys');
var contactRoutes=require('../routes/contact.routes');
var app = express();

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization,Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));




app.use('/api/contacts',contactRoutes);



app.set('port', process.env.PORT || 3000);





module.exports = app;
