// PlantDetail.js

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import PlantDetailParagraph from './PlantDetailParagraph';
import RecommendedPlant from './RecommendedPlant';
import { useParams} from "react-router-dom";

const Article = styled.article`
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    

`;
const Heading1 = styled.h1`
    font-size: 30px;
    margin: 8px 0;
`;
const Heading2 = styled.h2`
    font-size: 20px;
    margin: 20px 0 10px 0;
`;
const AlternateName = styled.h2`
    font-size: 20px;
    margin: 0;
    font-family: Montserrat;
    font-weight: normal;
`;
const Image = styled.img`
 
`;
const ImageContainer = styled.div`
    margin-top: 20px;
    height: 350px;
    max-width: 600px;
    overflow: hidden;
    box-shadow: 0px 0px 8px -2px grey;
    border-radius: 5px;
`;
const LeftSection = styled.section`
    width: 45%;
    min-width: 200px;
    padding-right: 20px;

    @media (max-width: 850px) {
        width: 100%;
    }
`;
const RightSection = styled.section`
    min-width: 200px;
    width: 50%;
    padding-top: 40px;

    @media (max-width: 850px) {
        width: 100%;
        padding-top: 0;
    }
`;

const RecommendedContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;


function PlantDetail() {
    let { name } = useParams();
    const [plantDetail, setPlantDetail] = useState([]);

	useEffect(()=> {
			fetch('https://herberttrinity-definesigma-5000.codio-box.uk/plant/' + name, 
			{ credentials: 'include' })
			.then(response =>response.json()
			.then(data => {setPlantDetail(data.plants);
			})
		);
	},[name]);


    return (
        <Article>
            <LeftSection>
                <Heading1>{plantDetail.name}</Heading1>
                <AlternateName>{ plantDetail.alternateName !== "" ? "Also called " +parse(String(plantDetail.alternateName)) : ""}</AlternateName>
                <ImageContainer>
                    <Image src={plantDetail.image} alt={plantDetail.name} />
                </ImageContainer>

                <PlantDetailParagraph heading="Sow Instructions" text={parse(String(plantDetail.sowInstructions))}/>
    
            </LeftSection>

            
            <RightSection>
                <PlantDetailParagraph heading="Space Instructions" text={parse(String(plantDetail.spaceInstructions))}/>
                <PlantDetailParagraph heading="Watering" text={`once in ${plantDetail.wateringInterval } days` }/>
                <PlantDetailParagraph heading="Harvest Instructions" text={plantDetail.harvestInstructions}/>
                { plantDetail.avoidInstructions ?  
                    <PlantDetailParagraph heading="Avoid" text={plantDetail.avoidInstructions}/>: ""
                }
                

                {plantDetail.compatibleWithImage !== undefined && plantDetail.compatibleWithImage.length !==0 ? 
                    <Heading2>Recommended Plants</Heading2>: ""
                }
                <RecommendedContainer>
                    {plantDetail.compatibleWithImage !== undefined ? plantDetail.compatibleWithImage.map(
                        recommended => <RecommendedPlant plant={recommended}/>
                    ) : ""}
                </RecommendedContainer>
                
                

            </RightSection>
            
        
        </Article>
    );
}

export default PlantDetail;