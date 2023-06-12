const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
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
}

export default {getUrls, postUrl}