import React, { useEffect, useState, useRef } from 'react';
import "../Styles/Home.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faArrowUp, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import HomeNavBar from "../components/homeNavBar";
import Sidebar from '../components/sideBar';

const Home = () => {
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const calculatedMaxScrollHeight = windowHeight - 200;
    setMaxScrollHeight(calculatedMaxScrollHeight);
  }, []);

  const handleTextareaChange = (e) => {
    setIsTyping(e.target.value.length > 0);
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <HomeNavBar />
        <div className="flex-grow-1" style={{ maxHeight: `${maxScrollHeight}px`, overflowY: 'auto', paddingLeft: '10px' }}>
          <Container fluid className="mt-5">
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8} xl={10}>
                <div className="border p-4 d-flex">
                  <div className="flex-grow-0 me-4">
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '24px', color: 'white' }} />
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
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '24px', cursor: 'pointer' , color: 'white'}} />
                      </a>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={10} lg={8} xl={10}>
                <div className="border p-4 d-flex">
                  <div className="flex-grow-0 me-4">
                    <FontAwesomeIcon icon={faComment} style={{ fontSize: '24px', color: 'white' }} />
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
                        <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '24px', cursor: 'pointer' , color: 'white'}} />
                      </a>
                      <a href="#">
                        <FontAwesomeIcon icon={faThumbsDown} style={{ fontSize: '24px', cursor: 'pointer', paddingRight: '10px' , color: 'white' }} />
                      </a>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={10} lg={8} xl={10}>
                <div className="border p-4 d-flex">
                  <div className="flex-grow-0 me-4">
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '24px', color: 'white' }} />
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
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '24px', cursor: 'pointer', color: 'white'  }} />
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Row className="justify-content-center" style={{ maxHeight: '10px' }}>
          <Col xs={12} md={10} lg={8} xl={10} className="text-center">
            <div className="input-group mb-3 position-relative custom-textarea-wrapper">
              <textarea
                ref={textareaRef}
                className="form-control custom-textarea"
                placeholder="Search here"
                aria-label="Search"
                onChange={handleTextareaChange}
                rows={1}
              />
              <button
                className={`btn custom-button ${isTyping ? 'active' : ''}`}
                type="button"
              >
                <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: '1.5em' }} />
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
