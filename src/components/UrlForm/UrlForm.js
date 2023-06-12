import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({error: ""})
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.title && this.state.urlToShorten) {
      this.props.postNewUrl(this.state.title, this.state.urlToShorten)
      this.clearInputs();
    } else {
      this.setState({error: "Please fill out all fields!"})
    }
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          className='title-input'
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          className='url-input'
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button className="submit-button" onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
        {this.state.error && <p className="error">{this.state.error}</p>}
      </form>
    )
  }
}

export default UrlForm;
