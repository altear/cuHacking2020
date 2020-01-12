import React from 'react';
import './App.css';
import {ReactComponent as AnnotationsFloor1} from './img/annotations_floor1.svg'
import {ReactComponent as AnnotationsFloor2} from './img/annotations_floor2.svg'
import floor1 from './img/floor1.png'
import floor2 from './img/floor2.png'
import data from './data/Murder-on-the-2nd-Floor-Raw-Data-v01.json'

var time = 0

function App() {
  var jason = {
		fontSize: '200px'
  }
  
  return (
    <div className="App">
      <p style={jason}>IT'S JASON.</p>
        <UiPanel />
        <Floor name="Floor1" image={floor1} annotations={AnnotationsFloor1} /> 
        <Floor name="Floor2" image={floor2} annotations={AnnotationsFloor2} /> 
		</div>
  );
}

class UiPanel extends React.Component {
  render () {
    // 
    let list_data = Object.values(data)
    let people = list_data.map(log_entry => log_entry['guest-id'])
    let devices = list_data.map(log_entry => log_entry['device-id'])
    let all_entities = new Set(people.concat(devices)) 
    
    return (
    <div>
      <div className="ui input">
        <input type="text" list="targets" placeholder="Choose target..." />
      </div>
      <datalist id="targets">
        {
          Array.from(all_entities).map(entity => {
            return <option value={entity}> {entity} </option>
          })
        }
      </datalist>
    </div>)
  }
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
