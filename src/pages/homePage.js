import '../styles/navBar.css';
import Swal from 'sweetalert2';
import "../styles/homePage.css";
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from 'react-router-dom';
import { useFarm } from '../context/farmContext';
import { UserAuth } from "../context/authContext";
import { ENDPOINTS, INTENTS } from '../constants';
import HomeNavBar from "../components/homeNavBar";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState, useRef } from 'react';
import { useSidebarData } from '../context/sidebarDataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteIcon from '../components/customizedIcons/deleteIcon';
import { faUser, faImage, faArrowUp, faMicrochip, faComment, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import ChatHelperTag from '../components/chatHelperTag';
import Joyride from 'react-joyride';

//TODO: Add tooltip to show the user where they should upload the
const Home = () => {
  const { idToken } = UserAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [farmOverview, setFarmOverview] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const [message, setMessage] = useState({ message: "" });
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load of chat history
  const fileInputRef = useRef(null);
  const [currentIntent, setCurrentIntent] = useState(null); // Track the current intent
  const [imageUrl, setImageUrl] = useState(''); // Store the uploaded image URL
  const targetRef = useRef(null);
  const [locationData, setLocationData] = useState(null);
  const [steps, setSteps] = useState([
    {
      target: '.upload-button',
      content: 'Upload image here',
      placement: 'top',
      disableBeacon: true
    },
  ]);

// sidebar components
  const sidebarData = useSidebarData();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const location = useLocation();
  const { farmData } = useFarm() || {};
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const isFarmPage = location.pathname === '/farmhome';
  const isIoTPage = location.pathname === '/farmhome/iot';
  

  const handleSideBar = (title) => {
      // Display popup with selected message
      Swal.fire({
      title: 'Saved History',
      text: title || 'No message found',
      icon: 'info',
      confirmButtonText: 'OK'
      });
  };

  const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
      }
      return text;
  };

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const calculatedMaxScrollHeight = windowHeight - 200;
    setMaxScrollHeight(calculatedMaxScrollHeight);

    // Load chat history from local storage on initial load
    if (initialLoad) {
      const savedChatHistory = localStorage.getItem('chatHistory');
      console.log("Loaded chat history from localStorage:", savedChatHistory);
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

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResponse = await fetch(ENDPOINTS.IP_TO_GEOLOC_URL);
        console.log("Location response:", locationResponse.json);

        if (locationResponse.ok) {
          const locationData = await locationResponse.json();
          setLocationData({
            city: locationData.city,
            country: locationData.country_name
          });
        } else {
          throw new Error('Failed to fetch location data');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  const clearMessageAfterSend = () => {
    setFormData({ message: "" });
    setMessage({ message: "" });
  };

  const handleDiseaseDetection = () => {
    console.log("I am Here");
    const newMessage = { message: "Can you help me predict a diseases I am noticing on my plants?" };
    setMessage(newMessage);
    handleChatRequest(newMessage, formData);
    clearMessageAfterSend();
  };

  const handleMarketPrediction = () => {
    console.log("I am Here");
    const newMessage = { message: "What is the agriculture market going to be like in the near future?" };
    setMessage(newMessage);
    handleChatRequest(newMessage, formData);
    clearMessageAfterSend();
  };

  const handleOutbreakAlerts = async () => {
    try {
      const response = await fetch(ENDPOINTS.OUTBREAK_ALERTS_URL);
      const diseaseAlerts = await response.json();
      console.log(diseaseAlerts);
  
      if (diseaseAlerts && diseaseAlerts.length > 0) {
        let alertMessage = "<ul>";
        diseaseAlerts.forEach(alert => {
          if (locationData && alert.location === locationData.country_name) {
            alertMessage += `<li>${alert.disease}</li>`;
          } else {
            alertMessage += `<li>${alert.disease} in ${alert.location}</li>`;
          }
        });
        alertMessage += "</ul>";
        Swal.fire({
          title: 'Disease Alerts',
          html: alertMessage,
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      } else {
        // Show no alerts message
        Swal.fire({
          title: 'No Disease Alerts',
          text: 'There are no disease alerts specific to your location at the moment.',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error fetching disease alerts:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch disease alerts. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleFormSubmit = (event) => {
      event.preventDefault(); // Prevent the form from submitting the default way
      handleChatRequest(message, formData); // Pass the current state message and formData
  };

  const handleChatRequest = async (newMessage, formData) => {

    console.log("Submitting form data:", formData);
    console.log("Submitting button data:", newMessage);

    if (formData.message.trim() == "" && newMessage.message.trim() == "") {
      alert("Please enter a message");
      return;
    }

    let requestData = {'message':""};

    if (newMessage && newMessage.message) {
      requestData.message = newMessage.message;
    } else if (formData && formData.message) {
      requestData.message = formData.message;
    }

    setCurrentIntent(null);

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
      requestData = { message: "" };

      handleChatResponse(intent_response);

      setFarmOverview(intent_response.response);

      // Parse JSON content if it's a stringified JSON and skip the first response and items without response
      const parsedChatHistory = intent_response.chat_history.slice(-2).map(item => {
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

      // Filter out items without a response
      const filteredParsedChatHistory = parsedChatHistory.filter(item => item.content);

      // Append the parsed messages to the existing chat history
      setChatHistory(prevChatHistory => [...prevChatHistory, ...filteredParsedChatHistory]);

      console.log("parsed history", filteredParsedChatHistory);
      console.log("prev history", chatHistory);

      // setChatHistory(parsedChatHistory.filter(item => item.content));
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
        {!(isFarmPage || isIoTPage) && (
          <>
            <button
                  className="menu-bars"
                  onClick={showSidebar}
                  style={{
                    position: 'fixed',
                    top: '-5px', // Top left corner
                    left: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.1s, box-shadow 0.1s',
                    bottom: '100px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    margin: 0,
                    width: '100px', // Width and height of the box
                    height: '60px',
                    padding: '10px',
                    zIndex: 2000, // Ensure it is above other elements
                    cursor: 'pointer',
                  }}
                >
                  {sidebar ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
              </button>
          </>
        )}

        <div className="nav-container">
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle'></li>
                    {sidebarData.map((item, index) => (
                    <li key={index} className={item.cName}>
                        <Link to="#" onClick={() => handleSideBar(item.title)}>
                        {item.icon}
                        <span>{truncateText(item.title, 15)}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>

            <div className="message-display">
                {selectedMessage && (
                    <div className="message-content">
                    <h2>Selected Message</h2>
                    <p>{selectedMessage}</p>
                    </div>
                )}
            </div>
        </div>

        <div
          style={{
            marginTop: '10px',
            flex: 1,
            overflowY: 'auto',
            // filter: 'blur(7px)',
            marginLeft: sidebar ? '20vw' : '0',
            transition: 'margin-left 0.3s ease',
          }}
          className="custom-scrollbar"
        > 

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

            {chatHistory.length === 0 && (
              <Container fluid className={"mt-5"}>
                <ChatHelperTag 
                    sidebar={sidebar}
                    handleOutbreakAlerts={handleOutbreakAlerts}
                    handleDiseaseDetection={handleDiseaseDetection}
                    handleMarketPrediction={handleMarketPrediction}
                />
              </Container>
            )}

            {chatHistory.map((message, index) => (
              <Container fluid key={index} className={"mt-5"}>

              {index === 0 && (
                  <ChatHelperTag 
                      sidebar={sidebar}
                      handleOutbreakAlerts={handleOutbreakAlerts}
                      handleDiseaseDetection={handleDiseaseDetection}
                      handleMarketPrediction={handleMarketPrediction}
                  />
              )} 
                <Row className="justify-content-center mt-5">
                  <Col xs={8} md={10} lg={8} xl={10} className={message.role === 'user' ? 'user-container' : 'assistant-container'}>
                    <div className="p-4 mb-3 d-flex align-items-center" >
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
                  <form onSubmit={handleFormSubmit}>
                    <div className="d-flex mb-1">
                      {currentIntent === INTENTS.DISEASE_PRED_INTENT && (
                        
                        <div>
                            <Joyride
                              steps={steps}
                              continuous={false}
                              showProgress={false}
                              showSkipButton={true}
                              styles={{
                                options: {
                                  zIndex: 10000,
                                  arrowColor: '#fff',
                                  backgroundColor: '#fff',
                                  overlayColor: 'rgba(0, 0, 0, 0.5)',
                                  primaryColor: 'rgba(102, 168, 97, 0.7)',
                                  textColor: '#333',
                                  width: '100%',
                                  spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.7)',
                                },
                                buttonSkip: {
                                  color: 'rgba(102, 168, 97, 0.7)',
                                  borderColor: 'rgba(102, 168, 97, 0.7)',
                                },
                              }}
                            />
                          <button
                          type="button"
                          className="btn btn-outline-secondary rounded-circle me-2 mb-10 upload-button"
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
                        placeholder="Please type your question here..."
                        aria-label="Message"
                        value={formData.message} 
                        // onChange={handleFormChange} 

                        // value={formData.message}
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

        {/* clear chat */}
        <DeleteIcon handleClearChat={handleClearChat} />
      </div>
    </div>
  );
};
export default Home;
