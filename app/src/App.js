import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ReactComponent as AnnotationsFloor1} from './img/annotations_floor1.svg'
import {ReactComponent as AnnotationsFloor2} from './img/annotations_floor2.svg'
import floor1 from './img/floor1.png'
import floor2 from './img/floor2.png'

function App() {
  return (
    <div className="App">
			<Floor name="Floor1" image={floor1} annotations={AnnotationsFloor1} /> 
			<Floor name="Floor2" image={floor2} annotations={AnnotationsFloor2} /> 
		</div>
  );
}

class Floor extends React.Component {
  constructor() {
    super()
    this.state = {
      annotations_style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    }
  }

  updateSvgSize = () => {
    let box = document.querySelector(`#${this.props.name} img`).getBoundingClientRect();
		this.setState({annotations_style: {
      position: 'absolute', top: window.scrollY + box.top, left: window.scrollX + box.left, height: box.height, width: box.width
    }})
  }

  componentDidMount() {
    // Wait 1 second after components mount so that images are properly sized
    setTimeout(this.updateSvgSize, 1000)
    window.addEventListener('resize', this.updateSvgSize)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSvgSize)
  }
  render() {
    const Annotations = this.props.annotations

    let svg_style = {
      display: 'block', 
      position: 'relative',
      width: '100%',
      height: '100%'
    }

    return (
      <div id={this.props.name}>
        <h1> {this.props.name} </h1>
        <img src={this.props.image} />
        <div style={this.state.annotations_style }>
          <Annotations style={svg_style} />
        </div>
      </div>
    )
  }
}

export default App;
