
/* Card.js */

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import colours from '../colours.js';
import TextButton from './TextButton';
import AddButton from './AddButton';
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
          /*color: colours.pink,
          background: "red",
          borderRadius: "100%"*/
        },
        "& .MuiIconButton-root": {
          padding: 0,
        },
        "& .MuiIconButton-root:hover": {
          backgroundColor: colours.background,
   
        }
    },
    media: {
        height: 180,
    },
    names: {
        "& p": {
            margin: 0,
            marginBottom: 5,
        },
        textAlign: "left",
        color: colours.typeface,
        fontSize: 18,
        height: "40px",
    },
    plantName: {
        fontFamily: "Montserrat Bold !important",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
    },
    alternateName: {
        fontSize: 14,
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
    },
});
const Left = styled.section`
    
`;
const Right = styled.section`
`;

export default function PlantCard({ image, name, alternateName, plantId, authorised, isAdded }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
     
        <CardMedia
          className={classes.media}
          image={image}
          title={name}
        />
        <CardContent className={classes.names}>
          <p className={classes.plantName}>
            {name}
          </p>
          <p className={classes.alternateName}>
            {alternateName}
          </p>
        </CardContent>
      
      <CardActions>

        <Left>
          <Link to={`/plant/${name}`}><TextButton buttonText="Learn More" /></Link>
        </Left>

        <Right>

        { authorised != "" && authorised != undefined ?
          <AddButton isAdded={isAdded} plantId={plantId} authorised={authorised} /> : ""
        }
        
              
        </Right>

      </CardActions>
    </Card>
  );
}