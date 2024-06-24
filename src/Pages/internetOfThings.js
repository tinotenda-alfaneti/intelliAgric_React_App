import "../styles/iotcss.css";
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNavBar from "../components/homeNavBar";
import { Container, Col, Row } from 'react-bootstrap';
import { UserAuth } from "../context/authContext";
import { ENDPOINTS } from '../constants';
import { useSoilData } from "../context/iotContext";
import GraphCard from "../components/cards/graphCard";
import PlotGraph from "../components/graphs/plotGraph";

const IoT = () => {
  const soilData = useSoilData();
  console.log("Soil Data", soilData);

  const [maxScrollHeight] = useState(0);
  const { idToken } = UserAuth();
  const [analysis, setAnalysis] = useState('Loading analysis...');

    const [data, setData] = useState({
        temp: '---',
        mois: '---',
        ph: '---',
        npk: '---',
    });

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
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, []);

    const MySwal = withReactContent(Swal);
 
    const handleShowTemperature = () => {
      console.log('handleShowTemperature clicked');
      MySwal.fire({
        title: 'Temperature Over Time',
        html: <PlotGraph data={tempData} />,
        width: '80%',
        customClass: 'swal-wide',
        showCloseButton: true,
        showConfirmButton: false,
      });
    };

    const handleShowMoisture = () => {
        console.log('handleShowMoisture clicked');
        MySwal.fire({
          title: 'Moisture Over Time',
          html: <PlotGraph data={tempData} />,
          width: '80%',
          customClass: 'swal-wide',
          showCloseButton: true,
          showConfirmButton: false,
        });
      };

      const handleShowpH = () => {
        console.log('handleShowMoisture clicked');
        MySwal.fire({
          title: 'pH Over Time',
          html: <PlotGraph data={tempData} />,
          width: '80%',
          customClass: 'swal-wide',
          showCloseButton: true,
          showConfirmButton: false,
        });
      };

    const tempData = [
        { timestamp: '2023-06-01T00:00:00Z', temp: 20 },
        { timestamp: '2023-06-02T00:00:00Z', temp: 22 },
        { timestamp: '2023-06-03T00:00:00Z', temp: 23 },
        { timestamp: '2023-06-04T00:00:00Z', temp: 20 },
        { timestamp: '2023-06-05T00:00:00Z', temp: 24 },
        { timestamp: '2023-06-06T00:00:00Z', temp: 30 },
      ];

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <HomeNavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }} />
            <div style={{ marginTop: '10px', flex: 1, overflowY: 'auto' }}>
                <Container fluid className="mt-5">
                    <Row className="justify-content-center">
                        <GraphCard
                            title="Soil Temperature"
                            value="20"  
                            unit="deg. C"
                            onClick={handleShowTemperature} 
                        />
                        <GraphCard
                            title="Soil Moisture"
                            value="50"  
                            unit="%"
                            onClick={handleShowMoisture} 
                        />
                        <GraphCard
                            title="Soil NPK"
                            value="10"  
                            unit="mg/kg"
                            // onClick={handleNPKClick} 
                        />
                        <GraphCard
                            title="Soil pH"
                            value="10"  
                            unit=""
                            onClick={handleShowpH} 
                        />
                    </Row>
                </Container>

                <Container fluid className="mt-5">
                    <Row className="justify-content-center">
                        <Col xs={10} sm={10} md={8} lg={9} xl={9} className="mb-4 clickable-col">
                            <div className="disease-info-container p-3 center-content">
                                {/* <p className="left-align" style={{textAlign:'left'}} dangerouslySetInnerHTML={{ __html: analysis }}></p> */}
                                {/* <button id="update-button" onClick={fetchData}>Update Analysis</button> */}
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