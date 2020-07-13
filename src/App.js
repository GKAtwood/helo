import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Routes from './routes'
import {Route} from 'react-router-dom'


class App extends Component {
 
  render() {
// const nav = this.props.location.pathname === '/' ? "" : 
    return (
      <div className="App">
        <Route component={Nav} />
    
        <Routes/>
    
      </div>
    );
  }
}

export default App;