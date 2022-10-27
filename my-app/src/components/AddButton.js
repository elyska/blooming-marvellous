
/* AddButton.js */

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import colours from '../colours.js';
import TextButton from './TextButton';
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles({
    root: {
        width: 280,
        margin: "10px",
        "& .MuiCardActions-root": {
            padding: "10px",
            display: "flex",
            justifyContent: "space-between"
        },
        "& .MuiSvgIcon-root": {
          fontSize: "30px",
          color: colours.pink,
          /*background: "red",
          borderRadius: "100%"*/
        },
        "& .MuiIconButton-root": {
          padding: 0,
        },
        "& .MuiIconButton-root:hover": {
          backgroundColor: colours.background,
   
        }
    },
});
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontFamily: "Montserrat"
  },
}))(Tooltip);


export default function AddButton({ plantId, authorised, isAdded }) {

    const [cookies, setCookie] = useCookies(['myPlants']);
   

    const classes = useStyles();
	const [added, setAdded] = useState(isAdded);

    const handleAddPlant = async () => {

        if (cookies.myPlants != undefined && cookies.myPlants.split(", ").includes(String(plantId))) return;

		const data = {plantId, authorised};

        const response = await fetch('https://herberttrinity-definesigma-5000.codio-box.uk/add-plant', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		console.log(response)
		if (response.ok){
			console.log('response worked!')
            setAdded(true)
            // add plants to cookies
			console.log('cookies.myPlants: ' + cookies.myPlants)
            if(cookies.myPlants != undefined) 
            {
                setCookie('myPlants', cookies.myPlants + ", " + String(plantId))
            }
            else setCookie('myPlants', plantId)
		}
        else {
			console.log('response not worked!')
        }
  }
  const handleRemovePlant = async () => {
    
  }

  return (
    
        <>
         {added ? 
          <LightTooltip TransitionComponent={Zoom} title="Remove from My Plants">
            <IconButton onClick={handleRemovePlant}>
              
                <HighlightOffIcon />
          
            </IconButton>
          </LightTooltip> :
          
          <LightTooltip TransitionComponent={Zoom} title="Add to My Plants">
            <IconButton onClick={handleAddPlant}>
              
                <AddCircleOutlineIcon/>
          
            </IconButton>
          </LightTooltip>
        }
         </>   
  );
}