
// SimpleLink.js

import styled from 'styled-components';
import colours from '../colours.js';
import { Link } from "react-router-dom";

const Text = styled.p`
    color: ${colours.pink};
    font-size: 18px;
    margin: 0;
    text-decoration: underline;

    &:hover {
        text-decoration: none;
    }
`;

function SimpleLink({ destinationPath, linkText }) {
    return (
        <Link to={destinationPath}><Text>{linkText}</Text></Link>
    );
}

export default SimpleLink;