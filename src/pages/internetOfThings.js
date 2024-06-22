import React,{ useState, useEffect } from 'react';
import { Container, Row, Col} from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import HomeNavBar from "../components/homeNavBar";
import '../styles/iot.css';
import { UserAuth } from "../context/authContext";
import Card from '../components/card';
import { ENDPOINTS } from '../constants';

const IoT = () => {
  
    const { user, logout, idToken } = UserAuth();

    const [data, setData] = useState({
        temp: '---',
        mois: '---',
        ph: '---',
        npk: '---',
    });

    const [analysis, setAnalysis] = useState('Loading analysis...');

    const fetchData = () => {
        fetch(ENDPOINTS.SOIL_DATA_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`,
          },
        }) 
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    };

    const fetchSoilAnalysis = () => {
        fetch(ENDPOINTS.SOIL_ANALYSIS_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`,
          },
        })
            .then(response => response.json())
            .then(data => {
                setAnalysis(data.analysis.replace(/\n/g, '<br>'));
            })
            .catch(error => {
                console.log('Error fetching analysis:', error);
            });
    };

    useEffect(() => {
        fetchData();
        fetchSoilAnalysis();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
      <div>
          <HomeNavBar />
          <Container fluid className="mt-5">
              <div className="container">
                    <Card title="Soil Temperature" value={data.temp} unit="deg. C" />
                    <Card title="Soil Moisture" value={data.mois} unit="%" />
                    <Card title="Soil pH" value={data.ph} unit="" />
                    <Card title="Soil NPK" value={data.npk} unit="mg/kg" />
              </div>

              <Row className="justify-content-center mt-4">
                  <Col xs={12}>
                      <div className="analysis-report">
                          <h2>SOIL ANALYSIS REPORT</h2>
                          <p id="analysis-content" dangerouslySetInnerHTML={{ __html: analysis }}></p>
                          <button id="update-button" onClick={fetchData}>Update Analysis</button>
                      </div>
                  </Col>
              </Row>
          </Container>
      </div>
  );
};

export default IoT;
