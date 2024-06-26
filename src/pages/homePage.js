import Swal from 'sweetalert2';
import "../styles/homePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserAuth } from "../context/authContext";
import { ENDPOINTS, INTENTS } from '../constants';
import HomeNavBar from "../components/homeNavBar";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faImage, faArrowUp, faMicrochip, faComment, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

//TODO: Add tooltip to show the user where they should upload the
const Home = () => {
  const { idToken } = UserAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [farmOverview, setFarmOverview] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load of chat history
  const fileInputRef = useRef(null);
  const [currentIntent, setCurrentIntent] = useState(null); // Track the current intent
  const [imageUrl, setImageUrl] = useState(''); // Store the uploaded image URL
  const targetRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const calculatedMaxScrollHeight = windowHeight - 200;
    setMaxScrollHeight(calculatedMaxScrollHeight);

    // Load chat history from local storage on initial load
    if (initialLoad) {
      const savedChatHistory = localStorage.getItem('chatHistory');
      console.log("Loaded chat history from localStorage:", savedChatHistory); // Debug log
      if (savedChatHistory) {
        setChatHistory(JSON.parse(savedChatHistory));
      }
      setInitialLoad(false); // Ensure this block only runs once
    }
  }, [initialLoad]);

  useEffect(() => {
    if (!initialLoad) {
      // Save chat history to local storage whenever it updates
      const chatHistoryToSave = chatHistory.slice(-20);
      localStorage.setItem('chatHistory', JSON.stringify(chatHistoryToSave)); // Save the last 20 messages
      console.log("Saved chat history to localStorage:", chatHistoryToSave); // Debug log
    }
  }, [chatHistory, initialLoad]);

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

    setCurrentIntent(null); // Reset the intent before new request

    // Show loading dialog
    const loadingDialog = Swal.fire({
      title: 'Sending...',
      text: 'Please wait while your message is being sent',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

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

          // Handle Market prediction intent
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
            console.log("Predict Market Intent Response", intent_response);

            if (intent_response.response) {
              setChatHistory(prevChatHistory => [...prevChatHistory, {
                role: 'assistant',
                content: intent_response.response
              }]);
            }

          // Handle Query ecommerce intent
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

            if (intent_response.response) {
              setChatHistory(prevChatHistory => [...prevChatHistory, {
                role: 'assistant',
                content: intent_response.response
              }]);
            }

          // Handle disease prediction intent
          } else if (responseObj.intent === INTENTS.DISEASE_PRED_INTENT) {
            console.log("Returned intent: ", responseObj.intent);
            console.log("Go to Crop disease endpoint");
            setCurrentIntent(INTENTS.DISEASE_PRED_INTENT);

          }

        } catch (error) {
          console.error("Error handling intent response:", error);
        }
      };

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

      setChatHistory(parsedChatHistory.filter(item => item.content));
      setFarmOverview(intent_response.response);

    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      // Close loading dialog
      Swal.close();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
    setShowTooltip(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log('Selected file:', file);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(ENDPOINTS.IMG_UPLOAD_URL, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        setImageUrl(data.path); // Set the uploaded image URL
        Swal.fire('Sucess', 'File uploaded successfully, now predicting...', 'success');

        if (currentIntent === INTENTS.DISEASE_PRED_INTENT) {
          const predictDiseaseData = {
            message: formData.message,
            path: data.path
          };

          const diseaseResponse = await fetch(
            ENDPOINTS.PREDICT_DISEASE_URL,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${idToken}`,
              },
              body: JSON.stringify(predictDiseaseData),
            }
          );

          const diseaseResponseData = await diseaseResponse.json();

          if (diseaseResponseData.response) {
            setChatHistory(prevChatHistory => [...prevChatHistory, {
              role: 'assistant',
              content: diseaseResponseData.response
            }]);
            setImageUrl(''); // Reset the image URL
            setCurrentIntent(null); // Reset the intent
          }
        }

      } else {
        const errorData = await response.json();
        console.error('Error uploading file:', errorData);
        Swal.fire('Error', 'Error uploading image: ' + errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error uploading image: ' + error, 'error');
    }
  };

  const handleSaveChat = (content) => {
    Swal.fire({
      title: 'Save this item?',
      text: "Do you want to save this item?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      console.log("Content 1", content);
      if (result.isConfirmed) {
        try {
          const response = await fetch(ENDPOINTS.CHAT_SAVE_URL, {
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

  const handleClearChat = () => {
    Swal.fire({
      title: 'Clear chat?',
      text: "Do you want to clear the chat history?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        setChatHistory([]);
        localStorage.removeItem('chatHistory');
        Swal.fire('Cleared!', 'Your chat history has been cleared.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your chat history is safe.', 'error');
      }
    });
  };

  return (
    <div className="d-flex" style={{ height: '100vh'}}>
      <div style={{ flex: 1 }}>
        <HomeNavBar style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
    
        <div style={{ marginTop: '10px', flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
          <div className="flex-grow-1" style={{ maxHeight: maxScrollHeight, zIndex: 1000 }}>
            <div
              style={{
                height: '100%',
                width: '100%',
                position: 'fixed',
                backgroundImage: 'url("/banner.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                marginTop: '-70px',
                zIndex: -1,
                filter: 'blur(7px)',
              }}
            ></div>
            
            {chatHistory.map((message, index) => (
              <Container fluid key={index} className={"mt-5"}>
                <Row className="justify-content-center">
                  <Col xs={12} md={10} lg={8} xl={10} className={message.role === 'user' ? 'user-container' : 'assistant-container'}>
                    <div className="p-4 mb-3 d-flex align-items-center">
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
        </div>

        <div>
          <Container fluid className="mt-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', bottom: '-25px', position: 'fixed'}}>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8} xl={10} className="text-center">
                <div className="p-4">
                  <form onSubmit={handleChatRequest}>
                    <div className="d-flex mb-1">
                      {currentIntent === INTENTS.DISEASE_PRED_INTENT && (
                        <div>

                          <button
                          type="button"
                          className="btn btn-outline-secondary rounded-circle me-2 mb-10"
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
                            marginTop: '15px',
                          }}
                        >
                          <FontAwesomeIcon icon={faImage} style={{ fontSize: '1.0em', color: 'black' }} />
                        </button>
                        </div>
                      )}
                      
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
                          marginTop: '15px',
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

        <div style={{ position: 'fixed', bottom: '10px', right: '10px', borderRadius: '50px'}}>
          <button
            className="btn btn-danger"
            onClick={handleClearChat}
          >
            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px'}} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

