
/* Card.js */

import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import colours from '../colours.js';
import TextButton from './TextButton';
import AddButton from './AddButton';
import AddReminder from './AddReminder';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    root: {
        position: "relative",
        width: 280,
        margin: "10px",
        "& .MuiCardActions-root": {
            padding: "10px",
            display: "flex",
            justifyContent: "space-between"
        },
        "& .MuiSvgIcon-root": {
          fontSize: "30px",
        },
        "& .MuiIconButton-root": {
          padding: 0,
        },
        "& .MuiIconButton-root:hover": {
          backgroundColor: colours.background,
        },
        "& .MuiChip-root": {
          backgroundColor: colours.bgTransparent,
          position: "absolute",
          fontFamily: "Montserrat",
          fontSize: "14px",
          right: "5px",
          top: "5px"
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
    iconButtonsWrapper: {
      display: "flex"
    }
});
const Left = styled.section`
    
`;
const Right = styled.section`
`;

const WaterIcon = styled.span`
    color: ${colours.blue};
`;

export default function PlantCard({ image, name, alternateName, plantId, authorised, isAdded, isSet, location, waterToday }) {
  const classes = useStyles();

  // controls Add reminder button's visibility
  const [visible, setVisible] = useState(waterToday);

  const handleVisibilityOn = () => {
      setVisible(true);
  }

  const handleVisibilityOff = () => {
      setVisible(false);
  }


  return (
    <Card className={classes.root}>
      { visible ? 
      // information about watering
        <Chip
          icon={<WaterIcon className="material-symbols-outlined">water_drop</WaterIcon>}
          label="Needs watering today"
        /> : ""
      }
     
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
          <Link to={`/plant/${name}`}><TextButton buttonText="See More" /></Link>
        </Left>

        <Right>
        <div className={classes.iconButtonsWrapper}>
        { authorised !== "" && authorised !== undefined && location == "/my-plants" ?
            <AddReminder 
              isAdded={isSet} 
              plantId={plantId} 
              handleVisibilityOn={handleVisibilityOn} 
              handleVisibilityOff={handleVisibilityOff} 
              authorised={authorised} />
           : ""
        }
        { authorised !== "" && authorised !== undefined ?
            <AddButton 
              name={name} 
              location={location} 
              handleVisibility={() => {}} 
              isAdded={isAdded} 
              plantId={plantId} 
              authorised={authorised} />
           : ""
        }
        </div>
              
        </Right>

      </CardActions>
    </Card>
  );
}