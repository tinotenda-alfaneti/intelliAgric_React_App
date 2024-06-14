import React, { useEffect, useState } from 'react';
import "../Styles/Home.css";
import { Container, Row, Col} from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faQ } from '@fortawesome/free-solid-svg-icons'
import HomeNavBar from "../components/homeNavBar";

import maize from "../Assets/maize.jpg";
import Sidebar from '../components/sideBar';

const DiseaseDetection=()=>{

  const [maxScrollHeight, setMaxScrollHeight] = useState(0);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const calculatedMaxScrollHeight = windowHeight -200; 
    setMaxScrollHeight(calculatedMaxScrollHeight);
  }, []);

  return (        
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <HomeNavBar />
        <div style={{ maxHeight: `${maxScrollHeight}px`, overflowY: 'auto', flex: 1 }}>
          <Container fluid className="mt-5">
            <Row className="justify-content-center">
              <Col xs={12} lg={8} xl={10}>
                <div className="border p-4">
                  <div className="mb-4 d-flex align-items-center">
                    <div className="me-4">
                      <FontAwesomeIcon icon={faQ} style={{ fontSize: '24px', color: 'green' }} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center border rounded overflow-hidden" style={{ width: '200px', height: '100px', marginRight: "30px" }}>
                      <img className="img-fluid" src={maize} alt="Profile" />
                    </div>
                    <div>
                      <p>
                        <h6>Disease name: Loreum Ipsum</h6>
                      </p>
                      <p>
                        <h6>Probability: 90.5%</h6>
                      </p>
                      <p>
                        <h6>Symptoms</h6> 

               
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                      volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                      Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                      lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                      Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                      volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                      Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                      lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                      Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum.
                    </p>
             
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div>
                        <p>
                          <h5>Recommendations</h5>
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                      volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                      Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                      lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                      Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                      volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                      Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                      lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                      Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum.
                        </p>
                      </div>
                      <div>
                        <p>
                          <h5>How to Control</h5>
                        </p>
                        <p>
                          <h6>Organic Control</h6>

                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                      volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                      Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                      lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                      Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                      volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                      Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                      lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                      Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum.
                        </p>
                        <p>
                          <h6>Chemical Control</h6>

                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                      volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                      Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                      lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                      Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                      volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                      Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                      lectus urna duis convallis convallis tellus. Nisl vel pretium lectus quam id leo in vitae turpis. 
                      Diam in arcu cursus euismod quis viverra. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid className="mb-10 mt-auto">
          <Row className="justify-content-center">
            <Col xs={12} lg={8} xl={10} className="text-center">
              <div className="input-group mb-3 justify-content-center">
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary bg-dark" type="button">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <FontAwesomeIcon icon={faUpload} style={{ fontSize: '4em' }} />
                      </div>
                      <div>Upload/Take Picture</div>
                    </div>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div> 
  );
};

export default DiseaseDetection;
