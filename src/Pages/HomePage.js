import "../Styles/Home.css";
import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faImage, faArrowUp, faUpload} from '@fortawesome/free-solid-svg-icons';
import HomeNavBar from "../components/homeNavBar";
import Sidebar from '../components/sideBar';
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout, idToken } = UserAuth();

  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [farmOverview, setFarmOverview] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const fileInputRef = useRef(null);

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

      // correct this to get the intent and make the if statements work
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

    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click()
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    console.log('Selected file:', file);
  
    const formData = new FormData();
    formData.append('image', file);// Append the file to the FormData object
  
    try {
      const response = await fetch("http://127.0.0.1:5000/upload-image", {
        method: "POST",
        headers: {
          'Authorization': "Bearer Auth",
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        alert('File uploaded successfully!');
        // Handle the response as needed
      } else {
        const errorData = await response.json();
        console.error('Error uploading file:', errorData);
        alert('Error uploading file: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
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

    
    {/* Used to display user  */}

    {/* <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <p>Token, {idToken}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please sign in to access data.</p>
      )}
    </div> */}

        <div className="input-container">
          <Container fluid className="mt-0">
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8} xl={10} className="text-center">
                <div className="border p-4">
                  <form onSubmit={handleChat}>
                    <div className="d-flex mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-secondary rounded-circle me-2"
                        onClick={handleUploadClick}
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
                        <FontAwesomeIcon icon={faImage} style={{ fontSize: '1.5em', color: 'black' }} />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef} 
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
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
