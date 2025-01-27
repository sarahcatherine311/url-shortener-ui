import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(response => this.setState({urls: response.urls}))
    .catch(err => this.setState({error: err}))
  }

  postNewUrl = (title, url) => {
    postUrl(title, url)
      .then(newUrl => this.setState({urls: [...this.state.urls, newUrl]}))
      .catch(err => this.setState({error: err}))
  }

  deleteUrl = (id) => {
    deleteUrl(id)
    .then(() => {
      return getUrls();
    })
    .then(response => {
      this.setState({ urls: response.urls});
    })
    .catch(err => {
      this.setState({ error: err });
    });
  }
  
  render() {
    return (
      <main className="App">
        <header>
          <h1 className='title'>URL Shortener</h1>
          <UrlForm postNewUrl={this.postNewUrl}/>
        </header>
        {this.state.error && <p className="error">{this.state.error.message}</p>}
        <UrlContainer urls={this.state.urls} deleteUrl={this.deleteUrl}/>
      </main>
    );
  }
}

export default App;
