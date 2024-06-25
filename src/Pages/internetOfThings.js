import "../styles/iotcss.css";
import "../styles/homePage.css";
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import ChatIcon from "../components/chatIcon";
import withReactContent from 'sweetalert2-react-content';
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNavBar from "../components/homeNavBar";
import { Container, Col, Row } from 'react-bootstrap';
import { useIoT } from "../context/iotContext";
import GraphCard from "../components/cards/graphCard";
import PlotGraph from "../components/graphs/plotGraph";

const IoT = () => {
  const [maxScrollHeight] = useState(0);
  const MySwal = withReactContent(Swal);
  const { soilAnalysisData, dailyAverages, currentSoilData } = useIoT();
  console.log("Soil Analysis Data", soilAnalysisData);
  console.log("Daily Averages", dailyAverages);
  console.log("Current Soil Data", currentSoilData);

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
          {/* <div style={{ marginTop: '1px', flex: 1, overflowY: 'auto' }} className="custom-scrollbar"> */}
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
            <Container fluid className="mt-0">
              <Row className="justify-content-center" style = {{marginTop:"-90px"}}>
                <GraphCard
                  title="Soil Temperature"
                  // value={currentSoilData.temp}
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
    
            <Container fluid className="mt-0">
              <Row className="justify-content-center">
                <Col xs={10} sm={10} md={8} lg={9} xl={9} className="mb-0 clickable-col" style = {{marginBottom:"50px"}}>
                  <div className="disease-info-container p-2 center-content">
                    <p className="left-align" style={{textAlign:'left'}} dangerouslySetInnerHTML={{ __html: soilAnalysisData }}></p>
                    {/* <button id="update-button" onClick={fetchData}>Update Analysis</button> */}
                  </div>
                </Col>
              </Row>
            </Container>
          <ChatIcon/>
        </div>
      </div>
    );
};

export default IoT;