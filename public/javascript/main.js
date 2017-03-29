(function() { // protect the lemmings

	function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};
			request.send();
		});
	} // GET

	
	function POST(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('POST', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function PUT(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('PUT', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function DELETE(url, data) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open('DELETE', url);
		request.setRequestHeader('Content-Type', 'application/json');

		request.onload = () => {
			const data = JSON.parse(request.responseText);
			resolve(data)
		}; 
		request.onerror = (err) => {
			reject(err)
		};

		request.send(JSON.stringify(data));
	});
} // DELETE



	
	function render(postItems) {
		const container = document.querySelector('.js-postlist');
		container.innerHTML = "";
		for (const postItem of postItems) {
			console.log(postItem);
			const title = document.createElement('div');

			title.innerHTML = `
                     <span class="js-title-text title-text">${postItem.data.post}</span> `;

			

			const editBtn = document.createElement('button');
			editBtn.classList.add('glyphicon', 'glyphicon-edit', 'js-edit');
			editBtn.style.float = 'right';


			const closeBtn = document.createElement('button');
			closeBtn.classList.add('glyphicon', 'glyphicon-remove', 'js-remove');
			closeBtn.style.float = 'right';


			title.appendChild(closeBtn);
			title.appendChild(editBtn);


			title.classList.add('list-group-item', 'postlist-item' );

			container.appendChild(title);

			const li = document.createElement('div');
			console.log(li)
			li.innerHTML = `
                     <div  class="js-content-text">${postItem.data.postText}</div>  
			`;


			li.classList.add('list-group-item', 'postlist-item');

			// const textarea = 

			const div = document.createElement('div');
			div.appendChild(title);
			div.appendChild(li);
			div.classList.add("post-box")
			container.appendChild(div);

			const editDiv = document.createElement('div');
			editDiv.innerHTML = `
				<div class="list-group-item postlist-item">
					<input type="text" style="border: none;" class="js-title-text-edit title-text" value="${postItem.data.post}" />
				</div>
				<div class='list-group-item postlist-item'>
					<textarea class="js-content-text-edit">${postItem.data.postText}</textarea>
				</div>
			`;
			editDiv.style.display = 'none';

			const saveBtn = document.createElement('button');
			saveBtn.classList.add('glyphicon', 'glyphicon-check', 'js-save');
			saveBtn.style.float = 'right';

			editDiv.querySelector('.postlist-item').appendChild(saveBtn)

			div.appendChild(editDiv);

			closeBtn.addEventListener('click', (e) => {
				DELETE('/api/post/' + postItem.id).then((data) => {
					console.log('delete complete')
					render(data)
				});
			});

			editBtn.addEventListener('click', (e) => {
				editDiv.style.display = 'block';
				title.style.display = 'none';
				li.style.display = 'none';

			});

			saveBtn.addEventListener('click', (e) => {
				PUT('/api/post/' + postItem.id, {
					post: editDiv.querySelector('.js-title-text-edit').value,
					postText: editDiv.querySelector('.js-content-text-edit').value
				}).then((data) => {
					console.log('delete complete')
					render(data)
					console.log(data)
				});
			})
		}

		if (postItems.length === 0) {
			container.innerHTML = `
<li class="list-group-item">
ADD some post!
</li>
			`;
		}
	} // render





	GET('/api/posts')
		.then((postItems) => {
			render(postItems);
		});

	

document.querySelector('.js-add-post').addEventListener('click', (e) => {
		const input = document.querySelector('.js-post-text');
		const textInput = document.querySelector('.js-post-body-text');
		input.setAttribute('disabled', 'disabled');

		POST('/api/post', {
			post: input.value,
			postText: textInput.value,
		
		}).then((data) => {
			input.removeAttribute('disabled');
			input.value = '';
			textInput.removeAttribute('disabled');
			textInput.value = '';
			render(data);
		});

		
	})

})();

