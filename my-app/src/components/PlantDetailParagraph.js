// PlantDetailParagraph.js

import React from 'react';
import styled from 'styled-components';
import colours from '../colours.js';
import BlockIcon from '@material-ui/icons/Block';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import HeightIcon from '@material-ui/icons/Height';

const Heading2 = styled.h2`
    font-size: 20px;
    margin: 20px 0 10px 0;
`;
const Paragraph = styled.p`
    font-size: 18px;
    margin: 0 0 10px 0;
`;
const WaterIcon = styled.span`
    transform: translateY(5px);
    margin-right: 10px;
`;

function PlantDetailParagraph({ heading, text }) {
    const iconStyles = { fontSize: "30px", transform: "translateY(8px)", marginRight: 10 }
    const icons = {
          'Space Instructions': <><LocalFloristIcon style={iconStyles}/>
                                    <HeightIcon style={{ rotate: "90deg", transform: "translateY(8px)"}}/>
                                <LocalFloristIcon style={iconStyles}/></>,
          'Avoid': <BlockIcon style={iconStyles}/>,
          'Watering': <WaterIcon className="material-symbols-outlined">water_drop</WaterIcon>
    }
    return (
        <>
            <Heading2>{heading}</Heading2>
            <Paragraph>
                {icons[heading]}
                {text}
            </Paragraph>
        </>
    );
}

export default PlantDetailParagraph;