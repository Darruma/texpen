import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Editor from './components/Editor';
class App extends Component {
  render() {
    return (
      <div className="App">
			<Router >
					<Route path= '/:id?' component={Editor}/>
			</Router>
      </div>
    );
  }
}

export default App;
