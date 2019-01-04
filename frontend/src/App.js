import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Editor from './components/Editor';
import Page from './components/Page'
class App extends Component {
  render() {
    return (
      <div className="App">
			<Router >
        <Switch>
					<Route path= '/:id?' component={Editor}/>
          <Route path='/view/:id' component={Page}></Route>
        </Switch>
			</Router>
      </div>
    );
  }
}

export default App;
