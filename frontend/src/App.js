import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Page from './components/Page'
import EditorContainer from './components/EditorContainer';
class App extends Component {
  render() {
    return (
      <div className="App">
			<Router >
        <Switch>
					<Route exact path= '/:id?' component={EditorContainer}/>
          <Route path='/view/:id' component={Page}></Route>
        </Switch> 
			</Router>
      </div>
    );
  }
}

export default App;
