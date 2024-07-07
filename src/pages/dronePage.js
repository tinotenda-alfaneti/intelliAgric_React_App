import React from 'react';
import "../styles/iotcss.css";
import "../styles/homePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFarm } from "../context/farmContext";
import HomeNavBar from "../components/homeNavBar";
import { Container, Col, Row } from 'react-bootstrap';
import ChatIcon from "../components/customizedIcons/chatIcon";
import DroneImagesGallery from "../components/droneImagesUrl";

const DronePage = () => {
    const { cropdiseases } = useFarm() || {};
    const analysis = cropdiseases?.analysis || '';

    return (
      <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <HomeNavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }} />
            <div
              style={{
                height: '100%',
                width: '100%',
                position: 'fixed',
                backgroundImage: 'url("/banner.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                marginTop: '4px',
                zIndex: -1,
                filter: 'blur(7px)',
              }}
            ></div>
            
            {/* Displaying the drone crop images from the database */}
            <DroneImagesGallery/> 

            <Container fluid className="mt-0">
              <Row className="justify-content-center">
                <Col xs={10} sm={10} md={8} lg={9} xl={9} className="mb-0 show-analysis" style = {{marginTop: "20px", marginBottom:"10px"}}>
                  <div className="disease-info-container p-2 center-content">
                    <p className="left-align" style={{textAlign:'left'}}>      
                      {analysis}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          <ChatIcon/>
        </div>
      </div>
    );
};

export default DronePage;