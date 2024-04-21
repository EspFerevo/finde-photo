'use strict';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import { searchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';

const loadBtn = document.querySelector('.load-btn');
const input = document.querySelector('#search-input');

let page = 1;
let searchWord = null;

document.getElementById('search-form').addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', onBtnClick);

async function handleSubmit(event) {
  event.preventDefault();
  page = 1;
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  searchWord = input.value.trim();

  try {
    const data = await searchImages(searchWord);
    if (data.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    displayImages(data.hits);
    if (data.total > 15) {
      loadBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    loader.style.display = 'none';
    input.value = '';
  }
}

async function onBtnClick() {
  page += 1;
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  try {
    const data = await searchImages(searchWord, page);
    displayImages(data.hits);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const lastPage = Math.ceil(data.totalHits / 15);
    if (lastPage === page) {
      loadBtn.style.display = 'none';
      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        messageColor: '#fff',
        position: 'bottomRight',
        backgroundColor: '#cb73fc',
        progressBar: false,
        close: false,
        timeout: 5000,
      });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    loader.style.display = 'none';
  }
}
