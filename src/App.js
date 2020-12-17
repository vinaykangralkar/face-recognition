import { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Logo from './components/logo/Logo.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const particleOptions = {
  
    particles: {
      number: {
        value: 70,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}

const app = new Clarifai.App({
  apiKey: 'bd1b81550e2b4a54b7e8d2707e385e8d'
 });

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonClick = () => {

    this.setState({imageURL: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (response){
        console.log(response);
      },
      function(err){
        console.log(err);
      }
    )
    
  }

  render (){
    return (
      <div className="App">
        <Particles className='particles'
                params={particleOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
        <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
