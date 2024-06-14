import "../Styles/Home.css";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import HomeNavBar from "../components/homeNavBar";
import Sidebar from '../components/sideBar';

const Home = () => {
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [farmOverview, setFarmOverview] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const [showModal, setShowModal] = useState(false);
  const [marketData, setMarketData] = useState({country: "", item: "", message:""});

  const HF_TOKEN = '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';

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const calculatedMaxScrollHeight = windowHeight - 200;
    setMaxScrollHeight(calculatedMaxScrollHeight);
  }, []);

  const handleChat = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    if (!formData.message) {
      alert("Please enter a message");
      return;
    }

    const requestData = {
      message: formData.message,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      
      const intent_response = await response.json();

      if (intent_response.message.toLowerCase().includes('predict maize disease')) {
        alert("This is a Maize Disease: " + intent_response.message);
      } else if (intent_response.message.toLowerCase().includes('predict agriculture market')) {
        console.log("Market Prediction detected, showing modal.");
        setShowModal(true); 
        alert("This is market prediction");
      } else {
        setFarmOverview(intent_response.message); 
      }

    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleMarket = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", marketData);
    console.log(formData.message);
    const messageVar = formData.message;

    if (!marketData.country || !marketData.item) {
      alert("Please enter a message for both country and item");
      return;
    }

    const marketInfo = {
      area: marketData.country,
      item: marketData.item,
      message: messageVar
    };

    console.log("Market info" , marketInfo);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/predict-market",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer" + HF_TOKEN
          },
          body: JSON.stringify(marketInfo),
        }
      );
            
      const message = await response.json();
      console.log(message);
      setFarmOverview(message.message);

    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <form onSubmit={handleMarket}>
            <div className="input-container">
              <label htmlFor="country">Country:</label>
              <input 
                value={marketData.country}
                onChange={(e) => setMarketData({ ...marketData, country: e.target.value })}
                type="text" id="country" name="country" 
              />
            </div>
            <div className="input-container">
              <label htmlFor="item">Item:</label>
              <input 
                value={marketData.item}
                onChange={(e) => setMarketData({ ...marketData, item: e.target.value })}
                type="text" id="item" name="item" 
              />
            </div>
            <button type="button" onClick={handleClose}>Close</button>
            <button type="submit">Save</button>
          </form>
        </section>
      </div>
    );
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ flex: 1 }}>
        <HomeNavBar />
        <div style={{ maxHeight: `${maxScrollHeight}px`, overflowY: 'auto' }}>
          <Container fluid className="mt-5">
            <Row className="justify-content-center">
              <Col xs={12} md={5} lg={5} xl={5} className="mb-4">
                <div className="border p-4 position-relative">
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
                  </p>
                  <div className="position-absolute bottom-0 end-0 m-3">
                    <a href="#" className="me-3">
                      <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '24px', cursor: 'pointer' , color:'white'}} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faThumbsDown} style={{ fontSize: '24px', cursor: 'pointer', paddingRight: '10px', color:'white'}} />
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={5} lg={5} xl={5} className="mb-4">
                <div className="border p-4 position-relative">
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
                  </p>
                  <div className="position-absolute bottom-0 end-0 m-3">
                    <a href="#" className="me-3">
                      <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '24px', cursor: 'pointer', color:'white'}} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faThumbsDown} style={{ fontSize: '24px', cursor: 'pointer', paddingRight: '10px', color:'white'  }} />
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid className="mt-5">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8} xl={10}>
              <div className="border p-4">
                <p>
                  {farmOverview && (
                    <p>
                      {farmOverview}
                    </p>
                  )}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid className="mt-0">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8} xl={10} className="text-center">
              <div className="border p-4">
                <form onSubmit={handleChat}>
                  <div className="d-flex mb-3">
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Write more than one line here"
                      aria-label="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        flex: 1,
                        resize: 'none',
                        paddingRight: '3em',
                      }}
                    ></textarea>
                    <button
                      className="btn btn-outline-secondary rounded-circle ms-2"
                      type="submit"
                      style={{
                        width: '3em',
                        height: '3em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        color: 'black',
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: '1.5em', color: 'black' }} />
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Modal Content</h2>
        <p>This is a modal dialog!</p>
      </Modal>

    </div>
  );
};

export default Home;