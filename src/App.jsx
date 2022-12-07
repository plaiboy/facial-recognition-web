import React,{ Component } from 'react';

import Clarifai from "clarifai";

import './App.css';

import ImageSearchForm from "./Components/ImageSearchForm/ImageSearchForm";
import FaceDetect from "./Components/FaceDetect/FaceDetect";

const app = new Clarifai.App({
  apiKey: "3d23bea393f6462f9174ded2ebdd8570"
});

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
    data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.botom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };



  onInputChange =(event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response) =>
    this.displayFaceBox(this.calculateFcaeLocation(response))

        ) .catch((err) => console.log(err));
      };
     

  render() {
    return (
   <div className="App">
    < ImageSearchForm 
    onInputChange={this.onInputChange} 
    onSubmit={this.onSubmit}
    />

     <FaceDetect  box={this.state.box} imageUrl={this.state.imageUrl} /> 
   </div>

    );
  }
}


  

export default App;
