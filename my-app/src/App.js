
import React, {useEffect, useState, Component} from 'react';
import './App.css';
import { Routes , Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AllPlants from './components/AllPlants';
import Login from './components/Login';

import styled, { createGlobalStyle } from 'styled-components'; 
import colours from './colours.js';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
		color: ${colours.typeface}
    }
	a {
		color: ${colours.typeface};
		text-decoration: none;
    }
`;

class App extends Component {
  render() {
    return (
	
	<div className="App">
	<GlobalStyle />
	<Navbar/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="all-plants" element={ <AllPlants/> } />
        <Route path="login" element={ <Login/> } />
      </Routes>
    </div>

    );
  }
}
export default App;
