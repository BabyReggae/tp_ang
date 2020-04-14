
var cluster = require('cluster');


////////////////////////////////
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
}else{
    //init app, by loading express
    var express = require('express');var app = express();
    var server = require('http').createServer( app );
    

    const bodyParser = require("body-parser");
    var mysql = require('mysql');

    setInterval( function(){ console.log( "runing => " , new Date() );} , 60000 );

    // parse requests of content-type: application/json
    app.use(bodyParser.json());

    // parse requests of content-type: application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // simple route
    app.all("/*", function(req, res, next){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      next();
    });

    app.use( require('./routes') );


    server.listen(8080);
console.log(`cluster ${cluster.worker.id} is up`);
}

// Listen for dying workers
cluster.on('exit', function (worker) {

    // Replace the dead worker,
    // we're not sentimental
    // the log syntax below ( c like ) rly suck btw
    console.log('Worker %d died :(', worker.id);
    cluster.fork();

});


