import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {
  const urlEls = props.urls.map(url => {
    const handleDelete = () => {
      props.deleteUrl(url.id);
    };
    
    return (
      <div key={url.id} className="url">
        <h3>{url.title}</h3>
        <a className='short-url' href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
        <button className="delete-button" onClick={handleDelete}>Delete Url</button>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
