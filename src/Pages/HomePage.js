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
            'Authorization': "Bearer Auth",
          },
          body: JSON.stringify(requestData),
        }
      );
      
      const intent_response = await response.json();
      console.log(intent_response.intent);

      if (intent_response.intent === "#Predict Crop Disease") {
        alert("Predict Crop Disease");
        setFarmOverview(intent_response);
      } else if (intent_response.intent === "#Predict Agriculture Market") {
        alert("Predict Agri Market");
        setFarmOverview(intent_response.message);
      } else {
        alert("General");
        setFarmOverview(intent_response); 
      }
      
      // const response = await fetch('http://127.0.0.1:5000/agriculture-news',{credentials: 'include'});
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomeNavBar />

        <Container fluid className="flex-grow-1 mt-5">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8} xl={10}>
              <div className="border p-4" style={{ maxHeight: maxScrollHeight, overflowY: 'auto' }}>
                {farmOverview && (
                  <p>
                    {farmOverview}
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        <div className="input-container">
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
      </div>
    </div>
  );
};

export default Home;
