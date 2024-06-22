import "../Styles/Container.css";
import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faImage, faArrowUp, faMicrochip, faComment, faSave } from '@fortawesome/free-solid-svg-icons';
import HomeNavBar from "../components/homeNavBar";
import Sidebar from '../components/sideBar';
import { UserAuth } from "../context/AuthContext";
import { ENDPOINTS, INTENTS } from '../constants';
import Swal from 'sweetalert2';
import ShowFarmStats from "../components/showFarmStats";

const Home = () => {
  const { idToken } = UserAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [farmOverview, setFarmOverview] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const fileInputRef = useRef(null);
  

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const calculatedMaxScrollHeight = windowHeight - 200;
    setMaxScrollHeight(calculatedMaxScrollHeight);
  }, []);

  const handleChatRequest = async (e) => {
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
        ENDPOINTS.CHAT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${idToken}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      
      var intent_response = await response.json();

      console.log("Intent Response", intent_response);

      // Handling intents from chat
      const handleChatResponse = async (chat_response) => {
        try {
            let responseObj = JSON.parse(chat_response.response);

            //handle Market prediction intent
            if (!responseObj.response && responseObj.intent === INTENTS.MARKET_PRED_INTENT) {
                console.log("Returned intent: ", responseObj.intent);
                console.log("Go to Predict Market endpoint");

                Object.assign(responseObj, requestData);

                console.log("ResponseObj: ", responseObj);

                const response = await fetch(
                  ENDPOINTS.PREDICT_MARKET_URL,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': `Bearer ${idToken}`,
                    },
                    body: JSON.stringify(responseObj),
                  }
                );
                intent_response = await response.json();

            // handle Query ecommerce intent
            //TODO: Handle query could not find data
            } else if (!responseObj.response && responseObj.intent === INTENTS.QUERY_ECOMMERCE_INTENT) {
                console.log("Returned intent: ", responseObj.intent);
                console.log("Go to Query Ecommerce endpoint");
                console.log(chat_response.chat_history)
                const response = await fetch(
                  ENDPOINTS.QUERY_ECOMMERCE_URL,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': `Bearer ${idToken}`,
                    },
                    body: JSON.stringify(requestData),
                  }
                );
                intent_response = await response.json();
      
            //handle disease prediction intent
            //TODO: load message to upload image
            } else if (!responseObj.response && responseObj.intent === INTENTS.DISEASE_PRED_INTENT) {
              console.log("Returned intent: ", responseObj.intent);
              console.log("Go to Crop disease endpoint");
              const response = await fetch(
                ENDPOINTS.PREDICT_DISEASE_URL,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${idToken}`,
                  },
                  body: JSON.stringify(requestData),
                }
              );
              intent_response = await response.json();
          }

        } catch (error) {
            console.error("Error handling intent response:", error);
        }
      };

      console.log('idToken homePage', idToken);

      handleChatResponse(intent_response);

      setFarmOverview(intent_response.response);
      
      // Parse JSON content if it's a stringified JSON and skip the first response and items without response
      const parsedChatHistory = intent_response.chat_history.slice(1).map(item => {
          try {
            const parsedContent = JSON.parse(item.content);
            return {
              ...item,
              content: parsedContent.response,
              intent: parsedContent.intent
            };

          } catch (e) {
            console.log(item);
            return item;
          }
        });

      // Clear the input message after successful processing
      setFormData({ message: "" });
      
      console.log("chat history", parsedChatHistory);
      
  
      setChatHistory(parsedChatHistory);
      setFarmOverview(intent_response.response);

    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    console.log('Selected file:', file);
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/upload-image", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${idToken}`,
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

// mssg saved to db
const handleSaveChat = async (content) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, save it!',
    cancelButtonText: 'No, cancel!',
  }).then(async (result) => {
    console.log("Content 1", content);
    if (result.isConfirmed) {
      try {
        const response = await fetch('http://127.0.0.1:5000/chat/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
          body: JSON.stringify({ content }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Chat saved successfully:', data);
          Swal.fire('Saved!', 'Your item has been saved.', 'success');
        } else {
          const errorData = await response.json();
          console.error('Error saving chat:', errorData);
          Swal.fire('Error', 'Error saving chat: ' + errorData.error, 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Error: ' + error.message, 'error');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log('Save canceled');
      Swal.fire('Cancelled', 'Your item was not saved.', 'error');
    }
  });
};

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomeNavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }} />
    
        <div style={{ marginTop: '10px', flex: 1, overflowY: 'auto' }}>
       
          <div className="flex-grow-1" style={{ maxHeight: maxScrollHeight }}>
          
            
        {chatHistory.map((message, index) => (
          <Container fluid key={index} className={message.role === 'user' ? 'user-container' : 'assistant-container'}>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8} xl={10}>
                <div className="border rounded p-4 mb-3 d-flex align-items-center">
                {/* <div className="message-container border rounded p-4 mb-3 d-flex align-items-center"> */}
                  <div className="me-4">
                    <FontAwesomeIcon icon={message.role === 'user' ? faUser : faMicrochip} style={{ fontSize: '24px', color: 'black' }} />
                  </div>
                  <div>
                    <p className={message.role}>
                      {message.role}
                    </p>
                    <p>
                      {message.content}
                    </p>
                    <div className="icon-container">
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ fontSize: '10px', color: 'black', margin: '0 10px', cursor: 'pointer' }}
                        onClick={() => handleSaveChat(message.content)}  
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        ))}

          </div>
          <ShowFarmStats />
        </div>

        <div className="input-container">
          <Container fluid className="mt-0">
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8} xl={10} className="text-center">
                <div className="border p-4">
                  <form onSubmit={handleChatRequest}>
                    <div className="d-flex mb-3">
                      <button
                        type="button"
                        className="btn btn-outline-secondary rounded-circle me-2"
                        onClick={handleUploadClick}
                        style={{
                          width: '2em',
                          height: '2em',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0',
                          backgroundColor: 'white',
                          border: '1px solid black',
                          color: 'black',
                        }}
                      >
                        <FontAwesomeIcon icon={faImage} style={{ fontSize: '1.0em', color: 'black' }} />
                      </button>
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                      <textarea
                        className="form-control"
                        rows="1"
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
                          width: '2em',
                          height: '2em',
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
