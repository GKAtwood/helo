import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Routes from './routes'


class App extends Component {
 
  render() {
// const nav = this.props.location.pathname === '/' ? "" : 
    return (
      <div className="App">
        <Nav/>
    
        <Routes/>
    
      </div>
    );
  }
}

export default App;