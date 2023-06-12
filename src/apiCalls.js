const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

const postUrl = (title, urlToShorten) => {
  return fetch()
}

export default getUrls