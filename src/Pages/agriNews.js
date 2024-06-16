import "../Styles/Home.css";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNavBar from "../components/homeNavBar";
import Sidebar from '../components/sideBar';
import NewsDiv from '../components/newsDiv'; 

const AgriNews = () => {


  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomeNavBar />

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Container fluid className="mt-5">
            <Row className="justify-content-center">
                <NewsDiv />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AgriNews;