import React from 'react';
import './App.css';
import {ReactComponent as AnnotationsFloor1} from './img/annotations_floor1.svg'
import {ReactComponent as AnnotationsFloor2} from './img/annotations_floor2.svg'
import floor1 from './img/floor1.png'
import floor2 from './img/floor2.png'
import title from './img/title.PNG'
import data from './data/Murder-on-the-2nd-Floor-Raw-Data-v01.json'
		let list_data = Object.values(data)
		let people = list_data.map(log_entry => log_entry['guest-id'])
		let devices = list_data.map(log_entry => log_entry['device-id'])
		let realDevices = list_data.map(log_entry => log_entry['device'])
		let events = list_data.map(log_entry => log_entry['event'])
		let timestamps = Object.keys(data)
		let all_entities = new Set(people.concat(devices))
  var stepStyle = {
	  border: '1px solid black',
	  padding: '1em',
	  width: '50%',
	  minWidth: '500px',
	  margin: 'auto',
	  marginBottom: '15vh'
  }

function App() {
  var jason = {
		marginTop: '10vh',
		fontSize: '200px'
  }
  
  var titleStyle = {
	  marginTop: '5vh'
  }
  
  return (
    <div className="App">
		<img src={title} style={titleStyle}/>
		<p style={jason}>IT'S JASON.</p>
		<StepThroughEvents />
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

class StepThroughEvents extends React.Component {
	state = {
		index: 0
	};

	handleClickf = () => {
		let i = this.state.index;
		if (i < 439){
			i++;
			this.setState({ index: i });
		}
	};

	handleClickb = () => {
		let i = this.state.index;
		if (i > 0){
			i--;
			this.setState({ index: i });
		}
	};

	handleClickf10 = () => {
		let i = this.state.index;
		if (i < 430){
			i += 10;
			this.setState({ index: i });
		}
	};

	handleClickb10 = () => {
		let i = this.state.index;
		if (i > 10){
			i -= 10;
			this.setState({ index: i });
		}
	};

	handleClickf100 = () => {
		let i = this.state.index;
		if (i < 340){
			i += 100;
			this.setState({ index: i });
		}
	};

	handleClickb100 = () => {
		let i = this.state.index;
		if (i > 100){
			i -= 100;
			this.setState({ index: i });
		}
	};

	render() {
		return (
		
		<div>
		  <div className="stepThrough" style={stepStyle}>
			<h4>View event details</h4>
			<p>Event #{ this.state.index + 1 }</p>
			<p>Time: { timeConverter(timestamps[this.state.index]) }</p>
			<p>Device: { realDevices[this.state.index] }</p>
			<p>Device-id: { devices[this.state.index] }</p>
			<p>Event: { events[this.state.index] }</p>
			<p>Person: { people[this.state.index] }</p>
		  <button onClick={ this.handleClickb100 }>Back 100</button>
		  <button onClick={ this.handleClickb10 }>Back 10</button>
		  <button onClick={ this.handleClickb }>Previous Event</button>
		  <button onClick={ this.handleClickf }>Next Event</button>
		  <button onClick={ this.handleClickf10 }>Forward 10</button>
		  <button onClick={ this.handleClickf100 }>Forward 100</button>
		  </div>
		</div>
		);
	}
}

function timeConverter(timething){
    let a = new Date(timething * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
	let time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	if (sec < 10){
		time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':0' + sec ;
	}
    return time;
  }

export default App;
