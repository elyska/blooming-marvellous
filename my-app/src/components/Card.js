
/* Card.js */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import colours from '../colours.js';
import TextButton from './TextButton';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: 280,
        margin: "10px",
        "& .MuiCardActions-root": {
            padding: "10px",
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

export default function PlantCard({ image, name, alternateName, plantId }) {
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
        <Link to={`/plant/${name}`}><TextButton buttonText="Learn More" /></Link>
      </CardActions>
    </Card>
  );
}