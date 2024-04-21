'use strict';

export function searchImages(query) {
  const apiKey = '43322409-71cdbf6ef8f62fb1f69ac5609';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(apiUrl).then(response => {
    if (!response.status) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}
