import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    owner: "",
    description: "",
    images: [],
    error: "",
    urls: []
  }

  handleUploadFile = (event) => {
    this.setState({images: [...event.target.files]});
  }
  
  updateInputState = (key, value) => {
    this.setState({ [key]: value });
  }

  uploadImages = () => {
    const data = new FormData();
    this.state.images.forEach((val, idx) => {
      data.append('images', val);
    });
    data.append('owner', this.state.owner);
    data.append('description', this.state.description);
    axios.post('http://localhost:8080/upload', data).then((response) => {
      this.setState({urls: response.data.urls, error: ""});
    }).catch(err => {
      this.setState({error: err.message});
    });
  }

  render() {
    const urlsElements = this.state.urls.map((url, idx) => (
      <p key={idx}>{url}</p>
    ));
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Please upload a image</h1>
        </header>
        <div className="App-content">
          <input placeholder="Owner name" type="text" name="owner" onChangeText={(value) => this.updateInputState('owner', value)} />
          <input placeholder="Image description" type="text" name="description" onChangeText={(value) => this.updateInputState('description', value)} />
          <input type="file" multiple accept="image/*" onChange={this.handleUploadFile} />
          <input type="button" onClick={() => this.uploadImages()} value="Upload images"/>
          { urlsElements }
          <p>{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default App;
