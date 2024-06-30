import "../styles/Home.css";
import React from 'react';
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNavBar from "../components/homeNavBar";
import FarmDataForm from "../components/newFarm";
import ChatIcon from "../components/customizedIcons/chatIcon";

const NewFarm = () => {
  return (
    <div className="d-flex">    
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomeNavBar />
        <Container fluid className="mt-0">
          <Row className="justify-content-center" style={{ marginTop: '-70px' }}> 
            <FarmDataForm />
          </Row>
        </Container>
      </div>
      <ChatIcon/>
    </div>
  );
};

export default NewFarm;