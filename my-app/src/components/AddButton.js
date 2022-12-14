
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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// success pop up
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    "& .MuiIconButton-root": {
          transform: "translateY(0) !important"
    },
    "& .MuiIconButton-root:hover": {
          backgroundColor: colours.green + " !important",
    },
    "& .MuiAlert-message": {
      transform: "translateY(5px)",
      fontFamily: "Montserrat"
    }
  },
  addIcon: {
      color: colours.green,  
  },
  removeIcon: {
      color: colours.red,  
  },
}));

// shows information on hover
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontFamily: "Montserrat"
  },
}))(Tooltip);


export default function AddButton({ plantId, authorised, isAdded, handleVisibility, location, name }) {
    const classes = useStyles();

    const [cookies, setCookie, removeCookie] = useCookies(['myPlants']);
   
    // sets the state of the button - added = true -> icon = red bin, added = false -> icon = green plus
	  const [added, setAdded] = useState(isAdded);
    // controls the snackbar
    const [openAdded, setOpenAdded] = React.useState(false);
    const [openRemoved, setOpenRemoved] = React.useState(false);

    useEffect(() => { setAdded(isAdded)}, [isAdded] );

    const handleAddPlant = async () => {
      console.log(cookies.myPlants)

		  const data = {plantId, authorised};
      // if plant is added, send a post request to the api
      const response = await fetch('https://herberttrinity-definesigma-5000.codio-box.uk/add-plant', {
			    method: 'POST',
			    credentials: 'include',
			    headers: {
				    'Content-type': 'application/json'
			    },
			    body: JSON.stringify(data)
		  })

		  if (response.ok){
			    console.log('response worked!')
          // change button state (icon)
          setAdded(true)
          // snackbar pop up
          setOpenAdded(true);
          // controls the visibility of the Add reminder button (hidden if plant not added)
          handleVisibility()
		  }
      else {
			  console.log('response not worked!')
      }
    }

    const handleRemovePlant = async () => {

		  const data = {plantId, authorised};

      // if plant is removed, send a post request to the api
      const response = await fetch('https://herberttrinity-definesigma-5000.codio-box.uk/remove-plant', {
			    method: 'POST',
			    credentials: 'include',
			    headers: {
				    'Content-type': 'application/json'
			    },
			    body: JSON.stringify(data)
		  })

		  if (response.ok){
			console.log('response worked!')
            // change button state (icon)
            setAdded(false)
            // snackbar pop up
            setOpenRemoved(true);
            if (location == "/my-plants") removeCookie('myPlants');
            // controls the visibility of the Add reminder button 
            // (hidden if plant not added - applies only for plants detail page)
            handleVisibility()
		  }
      else {
			  console.log('response not worked!')
      }
    }

  return (
    
        <>
         {added ? 
         // info on hover
          <LightTooltip TransitionComponent={Zoom} title="Remove from My Plants">
            <IconButton onClick={handleRemovePlant}>
              
                <DeleteForeverIcon className={classes.removeIcon}/>
          
            </IconButton>
          </LightTooltip> :
          
          <LightTooltip TransitionComponent={Zoom} title="Add to My Plants">
            <IconButton onClick={handleAddPlant}>
              
                <AddCircleOutlineIcon  className={classes.addIcon}/>
          
            </IconButton>
          </LightTooltip>
        }

        { location != "/my-plants" ?

         // success pop up
        <div  className={classes.root}>
          <Snackbar open={openAdded} autoHideDuration={6000} onClose={() => setOpenAdded(false)}>
            <Alert onClose={() => setOpenAdded(false)} severity="success">
              {name} added successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={openRemoved} autoHideDuration={6000} onClose={() => setOpenRemoved(false)}>
            <Alert onClose={() => setOpenRemoved(false)} severity="success">
              {name} removed successfully!
            </Alert>
          </Snackbar> 
        </div> : ""
        
        }
        
        
        </>   
  );
}