
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

import { Drawer, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
    root: {
       "& .MuiDrawer-paper": {
            padding: "75px 0 20px 30px",
        },
    },
    rootRight: {
        "& .MuiBadge-root": {
            transform: "translateY(-15px)",
        },
        "& .MuiBadge-root:hover": {
            cursor: "pointer", 
            "& .material-symbols-outlined": {
                color: colours.pink,
            }
        },
        "& .MuiBadge-badge": {
            backgroundColor: colours.blue,
            color: "white",
            fontFamily: "Montserrat"
        }, 
        "& .material-symbols-outlined": {
            transition: "all 0.2s",
        }

    }
});

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
    z-index: 1301;

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
        cursor: pointer;
    }
`;
const IconLink = styled.div`
    display: inline-block;
    transform: translateY(6px);
    margin-right: 10px;
`;
const WaterIcon = styled.span`
`;

function Navbar() {
    const navigate = useNavigate();
    const classes = useStyles();

    const [displayValue, setDisplay] = useState("none");
    const [menuIconDisplayValue, setMenuIconDisplay] = useState("block");
    
    const [cookies, setCookie, removeCookie] = useCookies(['auth', 'myPlants', 'myReminders']);

    const authorised = cookies.auth

    const handleLogout = () => {
        console.log("logout")
        removeCookie("auth")
        removeCookie("myPlants")
        removeCookie("myReminders")
        navigate("/login")
    }

    const [isDrawerOpened, setDrawerOpened] = useState(false);
    const toggleDrawerStatus = () => {
        setDrawerOpened(true)
    }
    const closeDrawer = () => {
        setDrawerOpened(false)
        setDisplay("none")
        setMenuIconDisplay("block");
    }

    return (
      <div>
        <LargeNav>
        <Nav>
            <Left>
                <Link to="/"><Logo src="/images/logo.png" alt='logo' /></Link>

                { authorised == undefined ? 
                    <Link to="/"><NavItem>Home</NavItem></Link> : ""
                }
                
                <Link to="all-plants"><NavItem>All Plants</NavItem></Link> 

                { authorised !== undefined ? 
                    <Link to="my-plants"><NavItem>My Plants</NavItem></Link> : ""
                }
                
            </Left>
            <Right className={classes.rootRight}>
                { authorised != undefined ? 
                    <div>
                        <Badge
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={4}
                        >
                            <WaterIcon className="material-symbols-outlined">water_drop</WaterIcon>
                        </Badge>
                        <NavItem onClick={handleLogout}><IconLink><PowerSettingsNewIcon/></IconLink>Log out</NavItem>

                        
                    </div>
                     : 
                    <Link to="login"><NavItem><IconLink><AccountCircleIcon/></IconLink>Log in</NavItem></Link>
                }
            </Right>
        </Nav>
        </LargeNav>

        <SmallNav>
        <Nav>
            <Left>
                <Link onClick={closeDrawer} to="/"><Logo src="/images/logo.png" alt='logo' /></Link>
            </Left>
            <Right>
                <NavItem>
                    <IconLink>
                        <MenuIcon style={{display: menuIconDisplayValue}} onClick={() => {
                            /* sets the visibility of mobile navbar */
                            setDisplay("block"); 
                            setMenuIconDisplay("none");
                            toggleDrawerStatus();
                        }}/>
                        <CloseIcon style={{display: displayValue}} onClick={() => {
                            /* sets the visibility of mobile navbar */
                            setDisplay("none")
                            setMenuIconDisplay("block");
                            closeDrawer();
                        }}/>
                    </IconLink>
                </NavItem>
            </Right>

            <div>
            <Drawer  className={classes.root}
                variant="temporary"
                open={isDrawerOpened}
                onClose={closeDrawer}
                anchor="top"
                onClick={closeDrawer}
            >
                { authorised == undefined ? 
                    <Link to="/"><NavItemMobile>Home</NavItemMobile></Link> : ""
                }
                
                <Link to="all-plants"><NavItemMobile>All Plants</NavItemMobile></Link> 

                { authorised !== undefined ? 
                    <Link to="my-plants"><NavItemMobile>My Plants</NavItemMobile></Link> : ""
                }

                { authorised == undefined ? 
                    <Link to="login"><NavItemMobile><IconLink><AccountCircleIcon/></IconLink>Log in</NavItemMobile></Link> : 
                    <NavItemMobile onClick={handleLogout}><IconLink><PowerSettingsNewIcon/></IconLink>Log out</NavItemMobile>
                }
            </Drawer>
            </div>

        </Nav>
        </SmallNav>
        </div>
    );
}

export default Navbar;