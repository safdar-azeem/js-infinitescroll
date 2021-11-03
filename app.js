const count = 10;
const apiKey = `owBWj8aEug-9uVH9JUzbA3eoLnh8Z0eDEJG6vTV6fC4`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}
`;
const loader = document.querySelector('.loader');
const imgContainer = document.querySelector('.container');
let photosArray = [];

function setAttributes(element, description) {
	for (let i in description) element.setAttribute(i, description[i]);
}

function displayPhotos() {
	photosArray.forEach(photos => {
		// creat acnhor
		let acnhor = document.createElement('a');
		acnhor.setAttribute('href', photos.links.html),
			setAttributes(acnhor, { href: photos.links.html, target: '_blank' });

		// creat img
		let img = document.createElement('img');
		setAttributes(img, {
			src: photos.urls.regular,
			alt: photos.alt_description,
			class: 'img-responsive',
		});

		loader.classList.remove('d-none');
		img.addEventListener('load', e => {
			loader.classList.add('d-none');
		});

		acnhor.appendChild(img);
		imgContainer.appendChild(acnhor);
	});
}

async function getPost() {
	try {
		const respons = await fetch(apiUrl);
		photosArray = await respons.json();
		displayPhotos();
	} catch (error) {
		console.log(error);
	}
}

getPost();

window.addEventListener('scroll', e => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
		getPost();
	}
});
