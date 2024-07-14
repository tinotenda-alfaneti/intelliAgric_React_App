import React from 'react';
import GraphCard from './cards/clickableCard'; // Adjust the import according to your file structure
import { useFarm } from "../context/farmContext";
import { Container, Row } from 'react-bootstrap';

const DroneImagesGallery = () => {
    const { cropdiseases } = useFarm() || {};
    const image_urls = cropdiseases?.images || []; // Check if cropdiseases exists and has images
  
    return (
        <Container fluid className="mt-0">
            <Row className="justify-content-center" style = {{marginTop:"2vh"}}>
                {image_urls.map((image_url, index) => (
                <GraphCard key={index} image={image_url}/>
                ))}
            </Row>
        </Container>
    );
  };
  
  export default DroneImagesGallery;
