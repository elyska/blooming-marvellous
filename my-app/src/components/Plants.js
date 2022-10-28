// Plants.js

import React from 'react';
import PlantCard from './Card';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { useCookies } from 'react-cookie';

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
    const parse = require('html-react-parser');
    const [cookies, setCookie] = useCookies(['auth']);
    const authorised = cookies.auth
    const [plantCookies, setPlantCookie] = useCookies(['myPlants']);
    const [reminderCookies, setReminderCookie] = useCookies(['myReminders']);

    let plantList = []
    if(plantCookies.myPlants != undefined) {
		console.log('plantCookies.myPlants: ' + plantCookies.myPlants)
        plantList = plantCookies.myPlants.split(", ")
    }
    let reminderList = []
    if(reminderCookies.myReminders != undefined) {
		console.log('reminderCookies.myReminders: ' + reminderCookies.myReminders)
        reminderList = reminderCookies.myReminders.split(", ")
    }

    return (
        <List>
            {plants.map(plant => {
				return (
					<ListItem key={plant.id}>
                        <PlantCard 
                            isSet={reminderList.includes(String(plant.id))}
                            isAdded={plantList.includes(String(plant.id))}
                            authorised={authorised}
                            image={plant.image} 
                            name={plant.name} 
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