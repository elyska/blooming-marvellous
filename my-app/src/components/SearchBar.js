
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
        "& .Mui-focused": {
            border: `2px solid ${colours.pink}`,
            "& .MuiSvgIcon-root": {
                color: `${colours.pink} !important`
            }
        },
    },
    input: {
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
        },
        "& .Mui-focused": {
        border: `2px solid ${colours.pink}`,
        },
    }
});

function SearchBar() {  
    const classes = useStyles();

    return (
        <form>
            <TextField 
                InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon style={{ color: colours.typeface }} /></InputAdornment>),disableUnderline: true,className: classes.input }}
                placeholder="Browse plants"
                className={classes.searchField} 
            variant="filled" 
                endAdornment={<InputAdornment 
                position="end" ><SearchIcon /></InputAdornment>}/>

        </form>
    );
}

export default SearchBar;