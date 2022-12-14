
// Plants.js

import React from 'react';
import PlantCard from './Card';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { useCookies } from 'react-cookie';
import {useLocation} from 'react-router-dom';

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    padding: 0;
`;
const ListItem = styled.li`
    list-style-type: none;
`;

function Plants({ plants }) {
    // displays a list of plant cards

    const location = useLocation().pathname;
    const [cookies, setCookie] = useCookies(['auth']);
    const authorised = cookies.auth;
    const [plantCookies, setPlantCookie] = useCookies(['myPlants']);
    const [reminderCookies, setReminderCookie] = useCookies(['myReminders']);

    // to control the Add plant and Add reminder button visibility based on cookies
    let plantList = []
    if(plantCookies.myPlants !== undefined) plantList = plantCookies.myPlants.split(", ");
    let reminderList = []
    if(reminderCookies.myReminders !== undefined) reminderList = reminderCookies.myReminders.split(", ");
    return (
        <List>
            {plants.map(plant => {
                let waterToday = false
                if (plant.waterToday != undefined) waterToday = plant.waterToday
                
				return (
					<ListItem key={plant.id}>
                        <PlantCard 
                            location={location}
                            isSet={reminderList.includes(String(plant.id))}
                            isAdded={plantList.includes(String(plant.id))}
                            authorised={authorised}
                            image={plant.image} 
                            name={plant.name} 
                            waterToday={waterToday} 
                            alternateName={parse(plant.alternateName)}
                            plantId={plant.id}
                        />
					</ListItem>
					)
				})}
        </List>
    );
}

export default Plants;