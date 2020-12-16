import { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Logo from './components/logo/Logo.js';
import Particles from 'react-particles-js';
import './App.css';

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

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonClick = () => {
    console.log('click');
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
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
