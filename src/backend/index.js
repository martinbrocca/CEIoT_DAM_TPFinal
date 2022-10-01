//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
var app = express();

//CORS Config
var conrsConfig = {
    origin: '*',
    optionSuccessStatus:200

}


//CORS Setup
const cors = require('cors');
// to parse application/json
app.use(express.json());

//Middleware CORS
app.use(cors(conrsConfig));



//var utils = require('./route/mysql');


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
//Measures Router connection
var routerMeasures = require('./route/Measures');
app.use('/measure', routerMeasures);
var routerMeasures = require('./route/Logs');
app.use('/logs', routerMeasures);
  
//=======[ Main module code ]==================================================


app.listen(PORT, function (req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
