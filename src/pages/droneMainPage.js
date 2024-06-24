import "../styles/Container.css";
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNavBar from "../components/homeNavBar";
import DroneInfo from '../components/tobedeleted/droneInfo';
import { Container, Col, Row } from 'react-bootstrap';

const IoT = () => {
  const [maxScrollHeight] = useState(0);

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <HomeNavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }} />
      
      <div style={{ marginTop: '10px', flex: 1, overflowY: 'auto' }}>
        <DroneInfo />
          <Container fluid className="mt-5">
            <Row className="justify-content-center">
              <Col xs={10} sm={10} md={8} lg={9} xl={9} className="mb-4 clickable-col">
                <div className="disease-info-container p-3">
                  <h6>Disease name: Lorem Ipsum</h6>
                  <h6>Probability: 90.5%</h6>
                  <h6>Symptoms:</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                    volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                    Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                    lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                    Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                    volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                    Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                    lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                    Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default IoT;

