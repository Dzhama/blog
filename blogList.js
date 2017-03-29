
// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

// default
db.defaults({ post: [] }).write();

const postList = {};


/*
	@func getItems
	@desc gets all post
*/
postList.getItems = () => {
	return db.get('post').value();	
	
}

/*
	@func createItem
	@desc creates a new post
*/

postList.createItem = (itemToCreate) => {
	db.get('post').push({
		id: Date.now(), 
		data: itemToCreate,
	}).write();
		
}

console.log(postList.getItems);

/*

*/	
postList.updateItem = (id, key, propertyToUpdate) => {
	db.get('post')
		  .find({ id })
		  .set(key, propertyToUpdate)
		  .write()	
}




postList.deleteItem = (id) => {
	db.get('post')
		.remove({id})
		.write();	
}



module.exports = postList;












