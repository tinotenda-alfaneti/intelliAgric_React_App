import React, { useEffect, useState } from 'react';
import "../Styles/Home.css";
import { Container, Row, Col} from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown , faComment, faArrowUp, faUser, faEdit} from '@fortawesome/free-solid-svg-icons'
import HomeNavBar from "../components/homeNavBar";

const Home=()=>{

  const [maxScrollHeight, setMaxScrollHeight] = useState(0);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const calculatedMaxScrollHeight = windowHeight -200; 
    setMaxScrollHeight(calculatedMaxScrollHeight);
  }, []);

  return (        
    <div>
      <HomeNavBar/>
      <div style={{ maxHeight: `${maxScrollHeight}px`, overflowY: 'auto' }}>

      <Container fluid className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={10}>
            <div className="border p-4 d-flex">
              <div className="flex-grow-0 me-4">
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '24px', color: 'green' }} />
              </div>
              <div className="flex-grow-1">
                <div>
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
                <div className="position-absolute bottom-0 end-0 m-3">
                  <a href="#" className="me-3">
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '24px', cursor: 'pointer' }} />
                  </a>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={10} lg={8} xl={10}>
            <div className="border p-4 d-flex">
              <div className="flex-grow-0 me-4">
                <FontAwesomeIcon icon={faComment} style={{ fontSize: '24px', color: 'green' }} />
              </div>
              <div className="flex-grow-1">
                <div>
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
                <div className="position-absolute bottom-0 end-0 m-3">
                  <a href="#" className="me-3">
                    <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '24px', cursor: 'pointer' }} />
                  </a>
                  <a href="#">
                    <FontAwesomeIcon icon={faThumbsDown} style={{ fontSize: '24px', cursor: 'pointer', paddingRight: '10px' }} />
                  </a>
                </div>
              </div>
            </div>
          </Col>

        <Col xs={12} md={10} lg={8} xl={10}>
          <div className="border p-4 d-flex">
            <div className="flex-grow-0 me-4">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '24px', color: 'green' }} />
            </div>
            <div className="flex-grow-1">
              <div>
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
              <div className="position-absolute bottom-0 end-0 m-3">
                <a href="#" className="me-3">
                  <FontAwesomeIcon icon={faEdit} style={{ fontSize: '24px', cursor: 'pointer' }} />
                </a>
              </div>
            </div>
          </div>
        </Col>

      </Row>
      </Container>
      </div>

      <Container fluid className="mt-5 fixed-bottom">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={10} className="text-center">
          <div className="border p-4" >
              <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Search here" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
              <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                  <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: '2.3em' }}/>
                  </button>
              </div>
              </div>
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;