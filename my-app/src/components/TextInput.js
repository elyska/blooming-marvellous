
// TextInput.js

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import colours from '../colours.js';


const useStyles = makeStyles((theme) => ({

    
  textField: {
        width: '20ch',
        "& .MuiFilledInput-input": {
            borderBottom: `3px solid ${colours.pink}`, 
            fontFamily: "Montserrat",
        },
        '& label': {
            fontFamily: "Montserrat",
        },
        '& label.Mui-focused': {
            color: colours.pink,
        },
  },
  input: {
        background: "white !important",
        color: colours.typeface,
        marginBottom: "20px"
  }
}));

function TextInput({ inputId, inputLabel, inputType }) {

    const classes = useStyles();

    return (
        <TextField 
            className={classes.textField} 
            id={inputId}
            label={inputLabel}
            variant="filled" 
            type={inputType}
            InputProps={{ className: classes.input, disableUnderline: true }}
        />      
    );
}

export default TextInput;