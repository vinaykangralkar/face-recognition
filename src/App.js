import { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Logo from './components/logo/Logo.js';
import Signin from './components/Signin/Signin.js';
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
      imageURL: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBox = (box) => {
    this.setState({box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonClick = () => {
    this.setState({imageURL: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {this.displayBox(this.calculateFaceLocation(response))})
    .catch(err => {console.log(err)})
  }

  render (){
    return (
      <div className="App">
        <Particles className='particles'
                params={particleOptions}
        />
        <Navigation />
        <Signin />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
        <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
