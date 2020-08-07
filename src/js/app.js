(function() {
	//"use strict"
	const log = console.log;

	//element array 
	let bookmarks;
	if(localStorage.getItem('bookmarks')) {
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	} else {
		bookmarks = [];
	}

	//Dom elements
	const webName = document.getElementById('site-name');
	const webUrl = document.getElementById('site-url');
	const outputContainer = document.querySelector('.output-container');
	const form = document.querySelector('form');
	const template = document.querySelector('.template');

	//functions
	const Bookmark = function(name, href) {
		this.name = name;
		this.href = href;
	}

	const render = () => {
		bookmarks.forEach(bookmark => {
			let html = template.textContent;
			html = html.replace('%name%', bookmark.name);
			html = html.replace('%href%', bookmark.href);
			outputContainer.innerHTML +=  html;

		});
	}

	const addBookmark = function(e){
		e.preventDefault();
		if(webName.value && webUrl.value) {
			outputContainer.innerHTML = '';
			var newBookmark = new Bookmark(webName.value, webUrl.value);
			bookmarks.push(newBookmark);
			render();
			saveBookmarks();
			webName.value = '';
			webUrl.value = '';
		}
	};



	const removeBookmark = function(e){
		if(e.target.classList.contains('btn-remove')) {
			const item = e.target.parentElement;
			const name = item.querySelector('.bookmark-name').textContent;
			const ind = bookmarks.findIndex(bookmark => {
				return bookmark.name == name
			});
			if(confirm('Are you sure you want to remove this website?')) {
				bookmarks.splice(ind, 1);
				outputContainer.innerHTML = '';
				render();
				saveBookmarks();
			}
		}
	};

	const saveBookmarks = function() {
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Events handlers
	render();
	form.addEventListener('submit', addBookmark);
	outputContainer.addEventListener('click', removeBookmark);

	localStorage.clear()

})()




































