// MyPlants.js

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import Button from './Button';
import Plants from './Plants';

const Heading1 = styled.h1`
    font-size: 30px;
    margin: 8px 0;
`;
const Image = styled.img`
    width: 180px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 55px;

    @media (max-width: 335px) {  
        margin-left: 20px;
    }
`;
const Paragraph = styled.p`
    font-size: 20px;
`;

function MyPlants() {
    const [cookies, setCookie] = useCookies(['auth']);
    const [plants, setPlants] = useState([]);
    const [plantCookies, setPlantCookie] = useCookies(['myPlants']);
    const [reminderCookies, setReminderCookie] = useCookies(['myReminders']);

    const authorised = cookies.auth

    // get all user's plats
    useEffect(()=> {
			fetch('https://herberttrinity-definesigma-5000.codio-box.uk/my-plants?username=' + authorised, 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlants(data.plants);
			})
			);

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
			
	},[plantCookies.myPlants]);

    // if not authorised, redirect to login
    if (authorised === undefined) {
        console.log("undef")
        window.location.pathname = '/login';
    }
    else {

    return (
        <article>
            <Heading1>My Plants </Heading1>  

            { plants === undefined || plants.length === 0 ?
            
            <>
                <Paragraph>You haven't added any plants.</Paragraph> 

                <figure>
                    <Image src="/images/empty-pot.png" alt="No plants" />
                </figure>

                <Link to="/all-plants"><Button buttonText="Get started" /></Link>
            </> : 

            <Plants plants={plants} />

            }

            

        </article>
    ); 
    }

    
    
}


export default MyPlants;