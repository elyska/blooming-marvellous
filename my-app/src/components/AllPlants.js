// AllPlants.js

import React, {useEffect, useState} from 'react';
import Plants from './Plants';
import SearchBar from './SearchBar';
import { useCookies } from 'react-cookie';

function AllPlants() {
    const [plants, setPlants] = useState([]);
    const [cookies, setCookie] = useCookies(['auth']);
    const [plantCookies, setPlantCookie] = useCookies(['myPlants']);

	useEffect(()=> {
		// get all plants
		fetch('https://herberttrinity-definesigma-5000.codio-box.uk/plants', 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlants(data.plants);
			})
			);
		// if user is logged in, get their selected plants, save them in cookies
			if (cookies.auth !== "" && cookies !== undefined) {
				fetch('https://herberttrinity-definesigma-5000.codio-box.uk/user-plants?username=' + cookies.auth, 
				{ credentials: 'include' })
				.then(response =>response.json()
				.then(data => {setPlantCookie('myPlants', data.myPlants);
				})
				);
			}
	},[plantCookies.myPlants]); // call every time plantCookies.myPlants changes

	const handleChange = event => {
		// get all plants that match the search term
		fetch('https://herberttrinity-definesigma-5000.codio-box.uk/plants?search=' + event.target.value, 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlants(data.plants);
			})
		);
		// update cookies
		if (cookies.auth !== "" && cookies !== undefined) {
				fetch('https://herberttrinity-definesigma-5000.codio-box.uk/user-plants?username=' + cookies.auth, 
				{ credentials: 'include' })
				.then(response =>response.json()
				.then(data => {setPlantCookie('myPlants', data.myPlants);
				}));}
  	};
    return (
        <article>
			<form>
            	<SearchBar handleInputChange={handleChange}/>
			</form>
            <Plants plants={plants} />
        </article>
    );
}

export default AllPlants;