//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
var app = express();
//var utils = require('./route/mysql');

// to parse application/json
app.use(express.json());
// to serve static files
//app.use(express.static('/home/node/app/static/'));

//logger function for troubleshooting
var logger = function (req, res, next) {
    console.log("LOGGER API - " + new Date() );
    next();
}
app.use(logger);


//Device Router connection
var routerDevice = require('./route/device');
app.use('/device', routerDevice);

//=======[ Main module code ]==================================================


app.listen(PORT, function (req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
