import '../styles/farmhome.css';
import { ENDPOINTS } from '../constants';
import ChatIcon from '../components/customizedIcons/chatIcon';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import HomeNavBar from '../components/homeNavBar';
import { UserAuth } from '../context/authContext';
import React, { useEffect, useState } from 'react';
import { faUser} from '@fortawesome/free-solid-svg-icons'; 
import { Container, Row, Col, Button } from "react-bootstrap"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FarmHomePage = () => {
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [farmData, setFarmData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const { idToken } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const calculatedMaxScrollHeight = windowHeight - 56; // Adjusted for the navbar height
      setMaxScrollHeight(calculatedMaxScrollHeight);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); // Update height on window resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchfarmData = async () => {
      if (!idToken) {
        return;
      }

      try {
        const response = await fetch(ENDPOINTS.FARM_OVERVIEW_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${idToken}`, 
          },
          credentials: 'include'
        });

        const data = await response.json();
        console.log("API Response:", data.response);
        setFarmData(data);

      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchfarmData();
  }, [idToken]);

  const handleIoT =()=>{
    console.log("I am here");
    navigate('/farmhome/iot');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }}>
      <HomeNavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }} />
      <div style={{ flexGrow: 1, marginTop: '-21px', overflowY: 'auto', maxHeight: maxScrollHeight }} className="custom-scrollbar">
        <Container fluid className="mt-0 p-0 full-width-container">
          
          <Row className="justify-content-center no-gutters">
            <Col xs={12} className="mb-0" style={{ height: '100vh' }}>
              <div
                className="content"
                style={{
                  height: '100%',
                  position: 'relative',
                  backgroundImage: 'url("/banner.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '40%',
                  left: '10%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  textAlign: 'left',
                }}>
                  <h1 style={{ fontSize: '5rem', fontWeight: 'bold' }}>{farmData?.response?.farm_name.toUpperCase() || "Farm Name Not Available"}</h1>
                  <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'light-green' }}>{farmData?.response?.farming_type.toUpperCase() || "Farming Type Not Available"}</h2>
                  <p style={{ maxWidth: '600px' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="light" onClick={handleIoT}>IOT MANAGEMENT</Button>
                    <Button variant="light">DRONE MANAGEMENT</Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid className="mt-0 p-0 full-width-container">
          <Row className="justify-content-center no-gutters align-items-center" style={{ height: '100vh' }}>
            <Col xs={12} md={6} className="text-left p-5">
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b5738' }}>ABOUT {farmData?.response?.farm_name.toUpperCase() || "Farm Name Not Available"}</h1>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#78c448' }}>FARM AND COMPANY</h2>
              <hr />
              <p style={{ fontSize: '2rem', maxWidth: '900px', color: '#333', lineHeight: '1.5' }}>
                <i className="fas fa-cloud-sun"></i> {farmData?.response?.recommendations || "Weather Conditions Not Available"}
              </p>
              <Button variant="success" style={{ borderRadius: '20px', padding: '5px 10px', maxWidth: '150px' }}>Read More</Button>
            </Col>

            <Col xs={12} md={6} className="text-center p-5">
              <div style={{ backgroundColor: '#3b5738', borderRadius: '50%', display: 'inline-block', padding: '0rem', width: '250px', height: '250px', maxWidth: '100%' }}>
                <img src="/farm.AVIF" alt="Wheat" style={{ borderRadius: '50%', width: '150%', height: '150%', objectFit: 'cover' }} />
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid style={{ backgroundColor: '#f0f0f0', minHeight: '20vh', marginTop: 'auto', paddingTop: '20px' }}>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={6} className="text-left p-5">
              <div className="d-flex justify-content-between">
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                  <p>Some dummy text</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                  <p>Some dummy text</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                  <p>Some dummy text</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                  <p>Some dummy text</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <ChatIcon/>
      </div>
    </div>
  );
};

export default FarmHomePage;
