
// Navbar.js

import { Link } from "react-router-dom";
import React, {useState} from 'react';
import styled from 'styled-components';
import colours from '../colours.js';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useCookies } from 'react-cookie';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useNavigate} from "react-router-dom";

const Nav = styled.nav`
    box-shadow: 0px 0px 8px -2px grey;
    padding: 10px 30px;
    text-align: left;
`;
const LargeNav = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    background: white;    
    z-index: 2;

    @media (min-width: 545px) {
        display: block;
    }
    @media (max-width: 545px) {
        display: none;
    }
`;
const SmallNav = styled.header`
    
    position: fixed;
    top: 0;
    width: 100%;
    background: white; 
    z-index: 2;

    @media (min-width: 545px) {
        display: none;
    }
    @media (max-width: 545px) {
        display: block;
    }
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
        cursor: pointer;
    }
`;

const NavItemMobile = styled.p`
    margin: 0px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
        color: ${colours.pink};
    }
`;
const IconLink = styled.div`
    display: inline-block;
    transform: translateY(6px);
    margin-right: 10px;
`;


function Navbar() {
    const navigate = useNavigate();

    const [displayValue, setDisplay] = useState("none");
    const [menuIconDisplayValue, setMenuIconDisplay] = useState("block");
    
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);

    const authorised = cookies.auth

    const handleLogout = () => {
        removeCookie("auth")
        navigate("/login")
    }
    return (
      <div>
        <LargeNav>
        <Nav>
            <Left>
                <Link to="/"><Logo src="/images/logo.png" alt='logo' /></Link>

                {authorised == undefined ? 
                    <Link to="/"><NavItem>Home</NavItem></Link> : ""
                }
                
                <Link to="all-plants"><NavItem>All Plants</NavItem></Link> 

                {authorised !== undefined ? 
                    <Link to="my-plants"><NavItem>My Plants</NavItem></Link> : ""
                }
                
            </Left>
            <Right>
                {authorised == undefined ? 
                    <Link to="login"><NavItem><IconLink><AccountCircleIcon/></IconLink>Log in</NavItem></Link> : 
                    <NavItem onClick={handleLogout}><IconLink><PowerSettingsNewIcon/></IconLink>Log out</NavItem>
                }
            </Right>
        </Nav>
        </LargeNav>

        <SmallNav>
        <Nav>
            <Left>
                <Link to="/"><Logo src="/images/logo.png" alt='logo' /></Link>
            </Left>
            <Right>
                <NavItem>
                    <IconLink>
                        <MenuIcon style={{display: menuIconDisplayValue}} onClick={() => {
                            /* sets the visibility of mobile navbar */
                            setDisplay("block"); 
                            setMenuIconDisplay("none");
                        }}/>
                        <CloseIcon style={{display: displayValue}} onClick={() => {
                            /* sets the visibility of mobile navbar */
                            setDisplay("none")
                            setMenuIconDisplay("block");
                        }}/>
                    </IconLink>
                </NavItem>
            </Right>

            <div style={{display: displayValue}}>
                <Link to="/"><NavItemMobile>Home</NavItemMobile></Link>
                <Link to="/all-plants"><NavItemMobile>All Plants</NavItemMobile></Link>
                <Link to="/login"><NavItemMobile><IconLink><AccountCircleIcon/></IconLink>Log in</NavItemMobile></Link>
            </div>
        </Nav>
        </SmallNav>
        </div>
    );
}

export default Navbar;