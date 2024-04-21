import axios from 'axios';

export async function searchImages(query, page) {
  const apiKey = '43322409-71cdbf6ef8f62fb1f69ac5609';
  const apiUrl = `https://pixabay.com/api/`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Network response was not ok');
  }
}
