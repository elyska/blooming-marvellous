
// Home.js

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'; 
import colours from '../colours.js';
import { Link } from "react-router-dom";
import Button from './Button';

const GlobalStyle = createGlobalStyle`
    @media (min-width: 1135px) {
        body {
            background: url("/images/bg.png") !important;
        }
    }
`;
const Article = styled.article`
    width: 70%;
    margin: auto;

    @media (max-width: 700px) {
        width: 90%;
    }
`;
const Paragraph = styled.p`
    margin: auto;
    margin-bottom: 70px;
    width: 50%;

    @media (max-width: 700px) {
        margin-bottom: 60px;
        font-size: 18px !important;
    }
`;
function Home() {
    return (
        <Article>
        <GlobalStyle/>
            <h1>Vegetables, Herbs and Edible Flowers</h1>

            <Paragraph>
                Access care instructions, culinary tips, get reminders to water your plants and much more
            </Paragraph>

            <Link to="/login"><Button buttonText="Get started" /></Link>
            
        </Article>
    );
}


export default Home;