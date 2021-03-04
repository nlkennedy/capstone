import React from 'react';
// import profile from '../images/person.jpg';
// import plus from '../images/plus.png';
import axios from 'axios';

class Predict extends React.Component {
	constructor(props) {
        super(props);
        this.closeWindow = this.closeWindow.bind(this);
    }

	closeWindow() {
        window.close();
    }


	render() {  
		return (
			<div>
				<div>
	                <button onClick={(e) => this.closeWindow()}>Click me!! </button>
	            </div>
				<img src="{% url 'video_feed' %}"/>
	    	</div>
	    	);
	}
}

export default Predict;


		    	