// RecommendedPlant.js

import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { Link } from "react-router-dom";

const Image = styled.img`
    border-radius: 100%;
    width: 80px;
    margin: auto;
    margin: 0 20px;
`;
const Fig = styled.figure`
    margin: 0;
    text-align: center;
    width: max-content;
    margin-bottom: 15px;
`;
const Caption = styled.figure`
    font-size: 20px;
    margin: 0;
`;

function RecommendedPlant({ plant }) {
    return (
        <Link to={`/plant/${plant.name}`}>
            <Fig>
                <Image src={plant.image} alt={plant.name} />
                <Caption>{parse(String(plant.name))}</Caption>
            </Fig>
        </Link>
    );
}

export default RecommendedPlant;