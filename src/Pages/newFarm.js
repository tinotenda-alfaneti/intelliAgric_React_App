import "../styles/Home.css";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNavBar from "../components/homeNavBar";
import FarmDataForm from "../components/addFarm";

const NewFarm = () => {
  return (
    <div className="d-flex">    
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomeNavBar />

        {/* <div style={{ flex: 1, overflowY: 'auto' }}> */}
          <Container fluid className="mt-0">
            <Row className="justify-content-center">
                <FarmDataForm />
            </Row>
          </Container>
        </div>
      </div>
    // </div>
  );
};

export default NewFarm;