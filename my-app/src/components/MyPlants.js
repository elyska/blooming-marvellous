// MyPlants.js

import styled from 'styled-components';
import colours from '../colours.js';
import Login from './Login';
import { useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import Button from './Button';

const Heading1 = styled.h1`
    font-size: 30px;
    margin: 8px 0;
`;
const Image = styled.img`
    width: 180px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 55px;

    @media (max-width: 335px) {  
        margin-left: 20px;
    }
`;
const Paragraph = styled.p`
    font-size: 20px;
`;

function MyPlants() {
    const [cookies, setCookie] = useCookies(['auth']);
    const navigate = useNavigate();

    const authorised = cookies.auth
    console.log(authorised)

    if (authorised == undefined) {
        console.log("undef")
        window.location.pathname = '/login';
    }
    else {
return (
        <article>
            <Heading1>My Plants </Heading1>  

            <Paragraph>You haven't added any plants.</Paragraph> 

            <figure>
                <Image src="/images/empty-pot.png" alt="No plants" />
            </figure>

            <Link to="/all-plants"><Button buttonText="Get started" /></Link>

        </article>
    ); 
    }

    
    
}


export default MyPlants;