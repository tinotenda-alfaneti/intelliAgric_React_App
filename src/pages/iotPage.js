import "../styles/iotcss.css";
import Swal from 'sweetalert2';
import "../styles/homePage.css";
import React, { useState } from 'react';
import ChatIcon from "../components/customizedIcons/chatIcon";
import "bootstrap/dist/css/bootstrap.min.css";
import { useIoT } from "../context/iotContext";
import HomeNavBar from "../components/homeNavBar";
import PhGraph from "../components/graphs/phGraph";
import { Container, Col, Row } from 'react-bootstrap';
import withReactContent from 'sweetalert2-react-content';
import GraphCard from "../components/cards/clickableCard";
import TemperatureGraph from "../components/graphs/tempGraph";
import MoistureGraph from "../components/graphs/moistureGraph";

const IoT = () => {
  const MySwal = withReactContent(Swal);
  const { soilAnalysisData, dailyAverages, currentSoilData } = useIoT();
  console.log("Soil Analysis Data", soilAnalysisData);
  console.log("Daily Averages", dailyAverages);
  console.log("Current Soil Data", currentSoilData);
  const tempUnit = 'deg. C';
  const moisUnit = '%';
  const npkUnit = 'mg/kg';

  const handleShowTemperature = () => {
    console.log('handleShowTemperature clicked');
    MySwal.fire({
      title: 'Temperature Over Time',
      html: <TemperatureGraph data={tempData} />,
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
        html: <MoistureGraph data={moistureData} />,
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
        html: <PhGraph data={phData} />,
        width: '80%',
        customClass: 'swal-wide',
        showCloseButton: true,
        showConfirmButton: false,
      });
    };

    let tempData = [];
    let phData = [];
    let moistureData = [];
    
    // Ensure dailyAverages is not null or undefined
    if (dailyAverages && Array.isArray(dailyAverages.averages)) {
      const averages = dailyAverages.averages;
    
      let lastValidTemp = null;
      tempData = averages.map(entry => {
        if (entry.temp !== undefined) {
          lastValidTemp = entry.temp;
        }
        return {
          timestamp: new Date(entry.timestamp).toISOString(),
          temp: lastValidTemp,
        };
      });
    
      let lastValidPh = null;
      phData = averages.map(entry => {
        if (entry.ph !== undefined) {
          lastValidPh = entry.ph;
        }
        return {
          timestamp: new Date(entry.timestamp).toISOString(),
          ph: lastValidPh,
        };
      });
    
      let lastValidMoisture = null;
      moistureData = averages.map(entry => {
        if (entry.mois !== undefined) {
          lastValidMoisture = entry.mois;
        }
        return {
          timestamp: new Date(entry.timestamp).toISOString(),
          moisture: lastValidMoisture,
        };
      });
    
      console.log('Temp Data:', tempData);
      console.log('PH Data:', phData);
      console.log('Moisture Data:', moistureData);
    } else {
      console.error('dailyAverages.averages is not an array or dailyAverages is null/undefined');
    }
    
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
              <Row className="justify-content-center" style = {{marginTop:"90px"}}>
                  <GraphCard
                    title="Soil Temperature"
                    value={
                      currentSoilData && currentSoilData.temp !== null ? (
                        <>
                          {currentSoilData.temp} {tempUnit}
                        </>
                      ) : (
                        'IoT device not connected'
                      )
                    }
                    onClick={handleShowTemperature}
                  />
                <GraphCard
                  title="Soil Moisture"
                  value = {
                    currentSoilData &&  currentSoilData.mois !== null ? (
                    <>
                      {currentSoilData.mois} {moisUnit}
                    </>
                  ) : (
                    'IoT device not connected'
                  )}
                  onClick={handleShowMoisture}
                />
                <GraphCard
                  title="Soil NPK"
                  value = { 
                    currentSoilData && currentSoilData.mois !== null ? (
                    <>
                      {currentSoilData.mois} {npkUnit}
                    </>
                  ) : (
                    'IoT device not connected'
                  )}
                  // unit="mg/kg"
                  // onClick={handleNPKClick}
                />
                <GraphCard
                  title="Soil pH"
                  value = {
                    currentSoilData && currentSoilData.ph !== null ? (
                    <>
                      {currentSoilData.ph}
                    </>
                  ) : (
                    'IoT device not connected'
                  )}
                  onClick={handleShowpH}
                />
              </Row>
            </Container>
    
            <Container fluid className="mt-0">
              <Row className="justify-content-center">
                <Col xs={10} sm={10} md={8} lg={9} xl={9} className="mb-0 show-analysis" style = {{marginBottom:"10px"}}>
                  <div className="disease-info-container p-2 center-content">
                    <p className="left-align" style={{textAlign:'left'}}>      
                      {soilAnalysisData ? (
                        <div dangerouslySetInnerHTML={{ __html: soilAnalysisData.analysis }} />
                      ) : (
                        <p>Soil analysis data is not available</p>
                      )}
                    </p>
                    <button id="update-button" >Update Analysis</button> 
                    {/* //add click event on this button */}
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