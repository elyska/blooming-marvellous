
// Button.js

import styled from 'styled-components';
import colours from '../colours.js';

const Btn = styled.button`
    background: ${colours.pink};
    color: white;
    padding: 10px 30px;
    border-radius: 5px;
    transition: all 0.2s;
	font-family: "Montserrat";
    font-size: 25px;
    border: none;
    
    &:hover {
        background: ${colours.pinkDarker};
        cursor: pointer;
    }
`;

function Button({ buttonText }) {
    return (
        <Btn>{buttonText}</Btn>
    );
}

export default Button;