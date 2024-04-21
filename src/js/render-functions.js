'use strict';

import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('#gallery .image-card', {
  captionsData: 'alt',
  captionsPosition: 'bottom',
  captionDelay: 250,
});

lightbox.refresh();

export function displayImages(images) {
  const gallery = document.getElementById('gallery');

  const imageCards = images.map(image => createImageCard(image));
  gallery.append(...imageCards);

  lightbox.refresh();
}

function createImageCard(image) {
  const card = `
    <a class="image-card" href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}">
      <div class="metadata-container">
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      </div>
    </a>
  `;

  const parseContainer = document.createElement('div');
  parseContainer.innerHTML = card;

  return parseContainer.firstElementChild;
}
