
//import React, {useEffect, useState} from 'react';
import './App.css';
import { Routes , Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AllPlants from './components/AllPlants';
import Login from './components/Login';
import Register from './components/Register';
import PlantDetail from './components/PlantDetail';

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
		padding-top: 80px;
		padding-bottom: 40px;
		font-size: 25px;
		width: 90%;
		margin: auto;
		text-align: center;
	}

	h1, h2, h3 {
		color: ${colours.pink};
		font-family: "Montserrat Bold";
	}

	h1 {
        font-size: 4rem;
		@media (max-width: 700px) {
        	font-size: 3rem;
    	}
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
        <Route path="register" element={ <Register/> } />
        <Route path="/plant/:name" element={ <PlantDetail/> } />
      </Routes>
    </div>

    );

}
export default App;
