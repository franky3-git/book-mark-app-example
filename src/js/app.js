//"use strict"
const log = console.log;

//Dom elements
const webName = document.getElementById('site-name');
const webUrl = document.getElementById('site-url');
const outputContainer = document.querySelector('.output-container');
const form = document.querySelector('form');
const template = document.querySelector('.template');

//functions
const addBookmark = function(e){
	e.preventDefault();
	if(webName.value && webUrl.value) {
		let html = template.textContent;
		html = html.replace('%name%', webName.value);
		html = html.replace('%href%', webUrl.value);
		outputContainer.insertAdjacentHTML('beforeend', html);
		webName.value = '';
		webUrl.value = '';
	}
}

const removeBookmark = function(e){
	if(e.target.classList.contains('btn-remove')) {
		var item = e.target.parentElement;
		item.remove();
	}
}

//Events handlers
form.addEventListener('submit', addBookmark)
outputContainer.addEventListener('click', removeBookmark)











































