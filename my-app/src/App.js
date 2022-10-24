
//import React, {useEffect, useState} from 'react';
import './App.css';
import { Routes , Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AllPlants from './components/AllPlants';
import Login from './components/Login';

import { createGlobalStyle } from 'styled-components'; 
import colours from './colours.js';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
		color: ${colours.typeface};
		background: ${colours.background};
		
    }
	a {
		color: ${colours.typeface};
		text-decoration: none;
    }
	article {
		padding-top: 70px;
		padding-bottom: 70px;
		font-size: 25px;
	}

	h1, h2, h3 {
		color: ${colours.pink};
		font-family: "Montserrat Bold";
	}

	h1 {
        font-size: 4rem;
	}
`;

function App() {

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
export default App;
