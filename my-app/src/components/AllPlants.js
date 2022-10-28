// AllPlants.js

import React, {useEffect, useState} from 'react';
import Plants from './Plants';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

const Article = styled.article`
    
`;

function AllPlants() {

    const [plants, setPlants] = useState([]);
    const [cookies, setCookie] = useCookies(['auth']);
    const [plantCookies, setPlantCookie] = useCookies(['myPlants']);
    const [reminderCookies, setReminderCookie] = useCookies(['myReminders']);

	useEffect(()=> {
			fetch('https://herberttrinity-definesigma-5000.codio-box.uk/plants', 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlants(data.plants);
			})
			);

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
		fetch('https://herberttrinity-definesigma-5000.codio-box.uk/plants?search=' + event.target.value, 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlants(data.plants);
			})
		);
  	};
    return (
        <Article>
			<form>
            	<SearchBar handleInputChange={handleChange}/>
			</form>
            <Plants plants={plants} />
        </Article>
    );
}

export default AllPlants;