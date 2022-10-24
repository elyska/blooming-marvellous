// Home.js

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'; 
import colours from '../colours.js';
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
    

    @media (max-width: 700px) {
        h1 {
            font-size: 3rem !important;
        }
    }
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
const Button = styled.a`
    background: ${colours.pink};
    color: white;
    padding: 10px 30px;
    border-radius: 5px;
    transition: all 0.2s;
    
    &:hover {
        background: ${colours.pinkDarker};
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

            <Link to="/login"><Button>Get started</Button></Link>
            
        </Article>
    );
}


export default Home;