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

	GET('/api/posts').then((data) => {
		console.log(data)
		
	})

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

	function render(postItems) {
		const container = document.querySelector('.js-postlist');
		container.innerHTML = '';
		for (const postItem of postItems) {
			console.log(postItems);
			const li = document.createElement('li');
			li.innerHTML = `
${postItem.data.post}
			`;

			if (postItem.data.isDone) {
				li.innerHTML += `<span class="glyphicon glyphicon-check postlist-icon js-post-check green"></span>`
			}
			else {
				li.innerHTML += `<span class="glyphicon glyphicon-unchecked postlist-icon js-post-check"></span>`
			}


			li.classList.add('list-group-item', 'postlist-item');

			container.appendChild(li);
			
			li.querySelector('.js-post-check').addEventListener('click', (e) => {
				console.log(postItem);
				let isDone;
				if (postItem.data.isDone) {
					isDone = false;
				}
				else {
					isDone = true;
				}

				PUT('/api/post/' + postItem.id, {isDone})
					.then((data) => {
						render(data);
					})
					.catch((e) => {
						alert(e)
					})
			})
			
		}

		if (postItems.length === 0) {
			container.innerHTML = `
<li class="list-group-item">
No postitems!
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
		input.setAttribute('disabled', 'disabled');

		POST('/api/posts', {
			post: input.value,
			when: new Date().getTime() + 9 * 60 * 60 * 1000
		}).then((data) => {
			input.removeAttribute('disabled');
			input.value = '';
			render(data);
		});
	})

})();

