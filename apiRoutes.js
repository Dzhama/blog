const express = require('express');

const router = express.Router();

const postList = require('./blogList')


// body parser middleware
const parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());

//define a route on `/hello/world`
router.get('/post',(request, response, next) => {
	next();
 console.log(2, router.get);
});



// post post
router.post('/post', (request, response, next) => {
	const requestBody = request.body;

	// Add a post
	postList.createItem(requestBody);

	next();
	

});



// put post
router.put('/post/:id', (request, response, next) => {
	console.log('HERE')
	const id = parseInt(request.params.id, 10);
	const dataPayload = request.body;

	postList.updateItem(id, 'data.post', dataPayload.post);
	postList.updateItem(id, 'data.postText', dataPayload.postText);

	next();
}); // post
 

// delete post
router.delete('/post/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);

	postList.deleteItem(id);

	next();
}); 

// delete

router.use((request, response) => {
	response.header('Content-Type', 'application/json');
	response.send(postList.getItems());	
});



module.exports = router;





