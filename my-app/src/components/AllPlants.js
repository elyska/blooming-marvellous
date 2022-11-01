// AllPlants.js

import React, {useEffect, useState} from 'react';
import Plants from './Plants';
import SearchBar from './SearchBar';
import { useCookies } from 'react-cookie';

function AllPlants() {

    const [plants, setPlants] = useState([]);
    const [cookies, setCookie] = useCookies(['auth']);
    const [plantCookies, setPlantCookie] = useCookies(['myPlants']);
    const [reminderCookies, setReminderCookie] = useCookies(['myReminders']);

	useEffect(()=> {
		// get all plants
		fetch('https://herberttrinity-definesigma-5000.codio-box.uk/plants', 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlants(data.plants);
			})
			);

		// if user is logged in, get their selected plants and reminder settings
			if (cookies.auth !== "" && cookies !== undefined) {
				fetch('https://herberttrinity-definesigma-5000.codio-box.uk/user-plants?username=' + cookies.auth, 
				{ credentials: 'include' })
				.then(response =>response.json()
				.then(data => {setPlantCookie('myPlants', data.myPlants);
				})
				);

				fetch('https://herberttrinity-definesigma-5000.codio-box.uk/user-reminders?username=' + cookies.auth, 
				{ credentials: 'include' })
				.then(response =>response.json()
				.then(data => {setReminderCookie('myReminders', data.myReminders);
				})
				);
			}
	},[plantCookies.myPlants]);

	

	const handleChange = event => {
		// get all plants that match the search term
		fetch('https://herberttrinity-definesigma-5000.codio-box.uk/plants?search=' + event.target.value, 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlants(data.plants);
			})
		);
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