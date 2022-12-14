
/* AddReminder.js */

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import colours from '../colours.js';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { useCookies } from 'react-cookie';

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


export default function AddReminder({ plantId, authorised, isAdded, handleVisibilityOff, handleVisibilityOn  }) {

    const [cookies, setCookie] = useCookies(['myReminders']);
   
    const classes = useStyles();

    // sets the state of the button - added = true -> icon = red crossed bell, added = false -> icon = green bell
	  const [added, setAdded] = useState(isAdded);

    useEffect(() => { setAdded(isAdded)}, [isAdded] );
    
    // controls the snackbar
    const [openAdded, setOpenAdded] = React.useState(false);
    const [openRemoved, setOpenRemoved] = React.useState(false);

    const handleAddReminder = async () => {

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
            // change button state (icon)
            setAdded(true)
            // snackbar pop up
            setOpenAdded(true)
            // set visibility (controlled by Add plant button)
            handleVisibilityOn()
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
            // change button state (icon)
            setAdded(false)
            // snackbar pop up
            setOpenRemoved(true)
            // set visibility (controlled by Add plant button)
            handleVisibilityOff()
		  }
      else {
			  console.log('response not worked!')
      }
    }

  return (
    
        <>
         {added ? 
          <LightTooltip TransitionComponent={Zoom} title="Turn off reminders">
            <IconButton onClick={handleRemoveReminder}>
              
                <NotificationsOffIcon className={classes.removeIcon}/>
          
            </IconButton>
          </LightTooltip> :
          
          <LightTooltip TransitionComponent={Zoom} title="Turn on reminders">
            <IconButton onClick={handleAddReminder}>
              
                <AddAlertIcon  className={classes.addIcon}/>
          
            </IconButton>
          </LightTooltip>
        }
        <div  className={classes.root}>
          <Snackbar open={openAdded} autoHideDuration={6000} onClose={() => setOpenAdded(false)}>
            <Alert onClose={() => setOpenAdded(false)} severity="success">
              Reminder added successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={openRemoved} autoHideDuration={6000} onClose={() => setOpenRemoved(false)}>
            <Alert onClose={() => setOpenRemoved(false)} severity="success">
              Reminder removed successfully!
            </Alert>
          </Snackbar> 
        </div> 
        
        </>   
  );
}