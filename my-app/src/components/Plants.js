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

    return (
        <List>
            {plants.map(plant => {
				return (
					<ListItem key={plant.id}>
                        <PlantCard 
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