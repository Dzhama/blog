
//include express
const express = require('express');

// static file server
const serveStatic = require('serve-static');

// api routes
const postApi = require('./apiRoutes');

//create an express application
const app = express();


app.use('/', serveStatic( 'public', {
	'index': [ 'index.html' ]
}));


app.use('/api',  postApi);




// using static server
app.use('/', serveStatic( 'public', {
	'index': [ 'index.html' ]
}));


//have the application listen on a specific port
app.listen(3333, function() {
  console.log('listening on 3333')

})