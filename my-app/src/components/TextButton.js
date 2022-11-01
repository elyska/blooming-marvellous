
// TextButton.js

import styled from 'styled-components';
import colours from '../colours.js';

const Btn = styled.button`
    background: transparent;
    color: ${colours.pink};
    padding: 5px 7px;
    border-radius: 5px;
    transition: all 0.2s;
	font-family: "Montserrat";
    font-size: 16px;
    border: none;
    text-transform: uppercase;
    
    &:hover {
        background: ${colours.background};
        cursor: pointer;
    }
`;

function TextButton({ buttonText }) {
    return (
        <Btn>{buttonText}</Btn>
    );
}

export default TextButton;