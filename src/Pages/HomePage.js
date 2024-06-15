import "../Styles/Home.css";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import HomeNavBar from "../components/homeNavBar";
import Sidebar from '../components/sideBar';
import NewsDiv from '../components/newsDiv'; 

const Home = () => {
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [farmOverview, setFarmOverview] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const [showModal, setShowModal] = useState(false);
  const [marketData, setMarketData] = useState({country: "", item: "", message:""});


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
      console.log(intent_response);

      // if (intent_response.message.toLowerCase().includes('predict maize disease')) {
      //   alert("This is a Maize Disease: " + intent_response.message);
      // } else if (intent_response.message.toLowerCase().includes('predict agriculture market')) {
      //   console.log("Market Prediction detected, showing modal.");
      //   setShowModal(true); 
      //   alert("This is market prediction");
      // } else {
      //   setFarmOverview(intent_response.message); 
      // }

    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // const handleMarket = async (e) => {
  //   e.preventDefault();
  //   console.log("Submitting form data:", marketData);
  //   console.log(formData.message);
  //   const messageVar = formData.message;

  //   if (!marketData.country || !marketData.item) {
  //     alert("Please enter a message for both country and item");
  //     return;
  //   }

  //   const marketInfo = {
  //     area: marketData.country,
  //     item: marketData.item,
  //     message: messageVar
  //   };

  //   console.log("Market info" , marketInfo);

  //   try {

  //     const response = await fetch(
  //       "http://127.0.0.1:5000/predict-market",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(marketInfo),
  //       }
  //     );
            
  //     const message = await response.json();
  //     console.log(message);
  //     setFarmOverview(message.message);

  //   } catch (error) {
  //     alert("Error: " + error.message);
  //   }
  // };

  // const handleCloseModal = () => setShowModal(false);

  // const Modal = ({ handleClose, show, children }) => {
  //   const showHideClassName = show ? "modal display-block" : "modal display-none";
  
  //   return (
  //     <div className={showHideClassName}>
  //       <section className="modal-main">
  //         {children}
  //         <form onSubmit={handleMarket}>
  //           <div className="input-container">
  //             <label htmlFor="country">Country:</label>
  //             <input 
  //               value={marketData.country}
  //               onChange={(e) => setMarketData({ ...marketData, country: e.target.value })}
  //               type="text" id="country" name="country" 
  //             />
  //           </div>
  //           <div className="input-container">
  //             <label htmlFor="item">Item:</label>
  //             <input 
  //               value={marketData.item}
  //               onChange={(e) => setMarketData({ ...marketData, item: e.target.value })}
  //               type="text" id="item" name="item" 
  //             />
  //           </div>
  //           <button type="button" onClick={handleClose}>Close</button>
  //           <button type="submit">Save</button>
  //         </form>
  //       </section>
  //     </div>
  //   );
  // };

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomeNavBar />
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Container fluid className="mt-5">
            <Row className="justify-content-center">
                <NewsDiv />
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
    </div>
  );
};

export default Home;