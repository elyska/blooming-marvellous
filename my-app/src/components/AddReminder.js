
/* AddReminder.js */

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import colours from '../colours.js';
import TextButton from './TextButton';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles({
    addIcon: {
      color: colours.green,  
    },
    removeIcon: {
      color: colours.red,  
    }
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


export default function AddReminder({ plantId, authorised, isAdded }) {

    const [cookies, setCookie] = useCookies(['myReminders']);
   
    const classes = useStyles();
	const [added, setAdded] = useState(isAdded);
    
    useEffect(() => { setAdded(isAdded)}, [isAdded] );

    const handleAddReminder = async () => {

        console.log("cookies.myReminders: " + cookies.myReminders)
        if (cookies.myReminders != undefined && cookies.myReminders.split(", ").includes(String(plantId))) return;

	    const data = {plantId, authorised};

        const response = await fetch('https://herberttrinity-definesigma-5000.codio-box.uk/add-reminder', {
			    method: 'POST',
			    credentials: 'include',
			    headers: {
				    'Content-type': 'application/json'
			    },
			    body: JSON.stringify(data)
		})

		if (response.ok){
			console.log('response worked!')
            setAdded(true)
		  }
        else {
			  console.log('response not worked!')
      }
    }

    const handleRemoveReminder = async () => {
		  const data = {plantId, authorised};

      const response = await fetch('https://herberttrinity-definesigma-5000.codio-box.uk/remove-reminder', {
			    method: 'POST',
			    credentials: 'include',
			    headers: {
				    'Content-type': 'application/json'
			    },
			    body: JSON.stringify(data)
		  })

		  if (response.ok){
			console.log('response worked!')
            setAdded(false)
		  }
      else {
			  console.log('response not worked!')
      }
    }

  return (
    
        <>
         {added ? 
          <LightTooltip TransitionComponent={Zoom} title="Remove from My Plants">
            <IconButton onClick={handleRemoveReminder}>
              
                <NotificationsOffIcon className={classes.removeIcon}/>
          
            </IconButton>
          </LightTooltip> :
          
          <LightTooltip TransitionComponent={Zoom} title="Add to My Plants">
            <IconButton onClick={handleAddReminder}>
              
                <AddAlertIcon  className={classes.addIcon}/>
          
            </IconButton>
          </LightTooltip>
        }
         </>   
  );
}