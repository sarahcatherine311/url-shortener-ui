import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
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

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm postNewUrl={this.postNewUrl}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
