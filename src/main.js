'use strict';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';

import { searchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';

const loadBtn = document.querySelector('.load-btn');
const input = document.querySelector('#search-input');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

let page = 1;
let searchWord = '';

document.getElementById('search-form').addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', handleLoadMoreClick);
loadBtn.style.display = 'none';

async function handleSubmit(event) {
  event.preventDefault();
  searchWord = input.value.trim();
  gallery.innerHTML = '';
  loader.style.display = 'block';

  try {
    const data = await searchImages(searchWord, page);
    if (data.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    displayImages(data.hits);
    if (data.total > 15) {
      loadBtn.style.display = 'block';
    }
    scrollPageSmoothly();
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    loader.style.display = 'none';
    input.value = '';
  }
}

async function handleLoadMoreClick() {
  page += 1;
  loader.style.display = 'block';

  try {
    const data = await searchImages(searchWord, page);
    displayImages(data.hits);
    scrollPageSmoothly();

    const lastPage = Math.ceil(data.totalHits / 15);
    if (lastPage === page) {
      loadBtn.style.display = 'none';
      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        messageColor: '#red',
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
async function onBtnClick() {
  page += 1;
  try {
    const data = await apiPixabay(searchWord, page);
    addPictures(data.hits);
    scrollPageSmoothly();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function scrollPageSmoothly() {
  const galleryElement = document.querySelector('.gallery');
  if (galleryElement && galleryElement.firstElementChild) {
    const { height: cardHeight } =
      galleryElement.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
