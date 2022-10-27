
// TextInput.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import colours from '../colours.js';


const useStyles = makeStyles((theme) => ({
  textField: {
        width: '20ch',
        ['@media (max-width:380px)']: { 
            width: '15ch'
        },
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
        '& .MuiFormHelperText-root': {
            margin: 0,
        },
        marginBottom: "20px"
  },
  input: {
        background: "white !important",
        color: colours.typeface,
  }
}));

function TextInput({ error, helperText, inputId, inputLabel, inputType, handleInputChange }) {

    const classes = useStyles();

    return (
        <TextField 
            error={error}
            helperText={helperText}  
            onChange={handleInputChange}
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