// Navbar.js

import { Link } from "react-router-dom";
import styled from 'styled-components'
import logo from './logo.png';
import colours from '../colours.js';


const Nav = styled.nav`
    box-shadow: 0px 0px 5px 0px grey;
    padding: 10px;
    text-align: left;
`;
const Left = styled.div`
    display: inline-block;
    width: 50%;
    text-align: left;
`;

const Right = styled.div`
    display: inline-block;
    width: 50%;
    text-align: right;
`;

const Logo = styled.img`
    height: 40px;
`;

const NavItem = styled.p`
    margin: 0px;
    margin-left: 40px;
    display: inline-block;
    transform: translateY(-13px);
    transition: all 0.2s;

    &:hover {
        color: ${colours.pink};
    }
`;


function Navbar() {
  return (
        <Nav>
            <Left>
                <Link to="/"><Logo src={logo} alt='logo' /></Link>
                <Link to="/"><NavItem>Home</NavItem></Link>
                <Link to="all-plants"><NavItem>All Plants</NavItem></Link>
            </Left>
            <Right>
                <Link to="login"><NavItem>Log in</NavItem></Link>
            </Right>
            
            
        </Nav>
    );
}

export default Navbar;