
// SearchBar.js

import styled from 'styled-components';
import colours from '../colours.js';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    searchField: {
        position: "static",
        "& .Mui-focused": {
            border: `2px solid ${colours.pink}`,
            "& .MuiSvgIcon-root": {
                color: `${colours.pink} !important`
            }
        },
    },
    input: {
        position: "static",
        background: "white !important",
        color: colours.typeface,
        padding: "10px 20px",
        borderRadius: "30px",
        transition: "all 0.2s",
	    fontFamily: "Montserrat",
        fontSize: "16px",
        outline: "none",
        fontFamily: "Montserrat",
        border: `2px solid ${colours.typeface}`,
        "& .MuiFilledInput-input": {
            padding: 0,
        position: "static",
        },
        "& .Mui-focused": {
        border: `2px solid ${colours.pink}`,
        },
    }
});

function SearchBar({handleInputChange}) {  
    const classes = useStyles();

	
    return (
            <TextField onChange={handleInputChange}
                InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon style={{ color: colours.typeface }} /></InputAdornment>),disableUnderline: true,className: classes.input }}
                placeholder="Browse plants"
                className={classes.searchField} 
                variant="filled" 
            />

    );
}

export default SearchBar;