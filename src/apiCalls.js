const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error fetching URLs');
    }
  });
}

const postUrl = (title, urlToShorten) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      long_url: urlToShorten
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error posting URL');
    }
  })
}

export {getUrls, postUrl}