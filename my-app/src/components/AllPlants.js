// AllPlants.js

import React, {useEffect, useState} from 'react';
import Plants from './Plants';
import SearchBar from './SearchBar';
import styled from 'styled-components';

const Article = styled.article`
    
`;

function AllPlants() {

    const [plants, setPlants] = useState([]);

	useEffect(()=> {
			fetch('https://herberttrinity-definesigma-5000.codio-box.uk/plants', 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlants(data.plants);
			})
		);
	},[]);

    console.log(plants)

    return (
        <Article>
            <SearchBar/>
            <Plants plants={plants} />
        </Article>
    );
}

export default AllPlants;