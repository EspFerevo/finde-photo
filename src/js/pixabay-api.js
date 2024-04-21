'use strict';

export async function searchImages(query) {
  const apiKey = '43322409-71cdbf6ef8f62fb1f69ac5609';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
