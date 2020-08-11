(function() {
	//"use strict"
	const log = console.log;
	const BOOKMARK_LOCAL = 'book.bookmarks';
	localStorage.clear()
	//element array 
	let bookmarks;
	if(localStorage.getItem(BOOKMARK_LOCAL)) {
		bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_LOCAL));
	} else {
		bookmarks = [];
	}

	//Dom elements
	const webName = document.getElementById('site-name');
	const webUrl = document.getElementById('site-url');
	const outputContainer = document.querySelector('.output-container');
	const form = document.querySelector('form');
	const template = document.querySelector('.template');
	const regexTestURL = /^http:\/\//;

	//Constructor functions for a bookmark
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

	const addBookmark = function(){
		if(webName.value) {
			if(regexTestURL.test(webUrl.value)) {
				outputContainer.innerHTML = '';
				var newBookmark = new Bookmark(webName.value, webUrl.value);
				bookmarks.push(newBookmark);
				render();
				saveBookmarks();
				webName.value = '';
				webUrl.value = '';
			} else {
				alert('Please enter a valid URL');
			}
		}
	};



	const removeBookmark = function(e){
		if(e.target.classList.contains('btn-remove')) {
			const item = e.target.parentElement;
			const name = item.querySelector('.bookmark-name').textContent;
			const ind = bookmarks.findIndex(bookmark => {
				return bookmark.name == name
			});
			if(confirm('Are you sure you want to remove this bookmark?')) {
				bookmarks.splice(ind, 1);
				outputContainer.innerHTML = '';
				render();
				saveBookmarks();
			}
		}
	};

	const saveBookmarks = function() {
		localStorage.setItem(BOOKMARK_LOCAL, JSON.stringify(bookmarks));
	}

	//Events handlers
	render();
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		addBookmark();
	});
	outputContainer.addEventListener('click', removeBookmark);
	document.addEventListener('keypress', function(e) {
		if(e.which === 13) {
			addBookmark()
		}
	});

})()



































