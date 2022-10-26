// RecommendedPlant.js

import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { Link } from "react-router-dom";

const Image = styled.img`
    border-radius: 100%;
    width: 100px;
    margin: auto;
`;
const Fig = styled.figure`
`;

function RecommendedPlant({ plant }) {
    const parse = require('html-react-parser');
    return (
        <Link to={`/plant/${name}`}>
        <figure>
            <Image src={plant.image} alt={plant.name} />
            <figcaption>{parse(String(plant.name))}</figcaption>
        </figure>
        </Link>
    );
}

export default RecommendedPlant;