//include express
const express = require('express');

// grab db
const low = require('lowdb');

// static file server
const serveStatic = require('serve-static');

// body parser middleware
const parser = require('body-parser');

//create an express application
const app = express();

// instantiate db
const db = low('./db.json');

//parses requests with the content type of `application/json`
app.use(parser.json());

//define a route on 
app.get('/api/posts',(request, response) => {
    response.header('Content-Type', 'application/json');
    response.send(db.get('posts').value());
});


// post posts
app.post('/api/posts', (request, response) => {
	const requestBody = request.body;

	// Add a post
	db.get('posts').push({
		id: Date.now(), 
		data: requestBody,
	}).write();

	response.header('Content-Type', 'application/json');
	response.send(db.get('posts').value());

});


// put posts
app.put('/api/post/:id', (request, response) => {
	const requestBody = request.body;
	const id = parseInt(request.params.id, 10)
 consle.log(id);
	db.get('posts')
		.find({ id })
		.set('data.isDone', requestBody.isDone)
		// .assign({ isDone: requestBody.isDone })
		.write()

	response.header('Content-Type', 'application/json');
	response.send(db.get('posts').value());

});

//delete 
app.delete('/api/post/:id', (request, response) => {
	
	const id = parseInt(request.params.id, 10)

	db.get('posts')
			  .remove({id})
			  .write()

			response.header('Content-Type', 'application/json');
			response.send(JSON.stringify(db.get('posts').value()));
	  
});


// using static server
app.use('/', serveStatic( 'public', {
	'index': [ 'index.html' ]
}));




//have the application listen on a specific port
app.listen(3333, function() {
  console.log('listening on 3333')

})