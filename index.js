var fs = require('fs');
var path = require('path');
var express = require('express');
var http = require('http');

var BASE_PATH = path.join(".","api");

fs.readdir(BASE_PATH, (err, files) => {
    files.forEach(fileName => {
      if (fileName.match(/^[0-9]+$/)){
        var API_PATH = path.join(BASE_PATH,fileName);
        var port = parseInt(fileName);
        var app = express();

        var options = {
            dotfiles: 'ignore',
            etag: true,
            //extensions: ['htm', 'html'],
            index: false,
            maxAge: '1d',
            redirect: false,
            setHeaders: function (res, path, stat) {
                var contentType = 'text/json';
                console.log("Getting "+path +" as "+ contentType);
                res.set('Content-type', contentType);
            }
        }
        app.use(express.static(API_PATH, options));  
        app.get('/', function(req, res) {
            res.send("{}")
        });
        var httpServer = http.createServer(app);
        console.log("Starting serving files in "+ API_PATH+ " port "+ port);
        httpServer.listen(port); 
        httpServer.on('error',(e) => {
            console.log('Error listening on port '+ e.port + " : " + e.message);
        })

      }
    });
});





