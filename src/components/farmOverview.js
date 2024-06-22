import '../styles/ShowFarmStats.css';
import { ENDPOINTS } from '../constants';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserAuth } from '../context/authContext';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";

const FarmOverview = () => {
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [newsData, setNewsData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const { idToken } = UserAuth();

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const calculatedMaxScrollHeight = windowHeight - 200;
    setMaxScrollHeight(calculatedMaxScrollHeight);
  }, []);

  const handleClick = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    const fetchNewsData = async () => {
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
        setNewsData(data);

      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [idToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxHeight: `${maxScrollHeight}px`, overflowY: 'auto' }}>
      <Container fluid className="mt-5">
        <Row className="justify-content-center">
          <Col
            xs={12} sm={6} md={4} lg={2} xl={2}
            className="mb-4 clickable-col"
            onClick={() => handleClick('https://example.com')} // Replace with actual URL if needed
          >

            <div className="content">
              <div className="icon">
                <i className="fas fa-tractor fa-3x"></i> {/* Example: Adjust icon size */}
              </div>
              <div className="details">
                <p className="title">{newsData?.response?.farm_name || "Farm Name Not Available"}</p>
                <p><i className="fas fa-globe"></i> {newsData?.response?.country || "Country Not Available"}</p>
                <p><i className="fas fa-expand-arrows-alt"></i> {newsData?.response?.land_size || "Land Size Not Available"}</p>
                <p><i className="fas fa-seedling"></i> {newsData?.response?.farming_type || "Farming Type Not Available"}</p>
                <p><i className="fas fa-cloud-sun"></i> {newsData?.response?.weather_conditions || "Weather Conditions Not Available"}</p>
                {/* <p><i className="fas fa-cloud-sun"></i> {newsData?.response?.recommendations || "Weather Conditions Not Available"}</p> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FarmOverview;
