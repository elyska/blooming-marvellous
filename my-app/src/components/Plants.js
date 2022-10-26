// Plants.js

import React from 'react';
import PlantCard from './Card';
import styled from 'styled-components';
import parse from 'html-react-parser';

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
    return (
        <List>
            {plants.map(plant => {
				return (
					<ListItem key={plant.id}>
                        <PlantCard 
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