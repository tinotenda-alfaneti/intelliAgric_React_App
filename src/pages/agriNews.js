import React from 'react';
import NewsDiv from '../components/newsDiv'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row} from "react-bootstrap";
import HomeNavBar from "../components/homeNavBar";

const AgriNews = () => {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomeNavBar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Container fluid className="mt-5">
            <Row className="justify-content-center">
                <NewsDiv /> //news div used to show the news 
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AgriNews;