var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var https = require('https');

var server_port = 8080
var server_ip_address = '127.0.0.1'


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app = express()


app.get('/dataset',  urlencodedParser, function (req, res, next) {

    console.log(res.body)

})



app.post('/process_post', urlencodedParser, function (req, res, next) {

    console.log("enter here")

})




/* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     res.sendFile( __dirname +"/html/main"+ req.params[0]);
 });





if (module === require.main) {
  // [START server]
  // Start the server
  	var server = app.listen(server_port, server_ip_address, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
    console.log('Press Ctrl+C to quit.');

  });
  // [END server]
}

module.exports = app;