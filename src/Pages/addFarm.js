import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CustomInput from '../components/input';
import CustomSelect from '../components/select';
import { UserAuth } from "../context/authContext";

const FarmDataForm = () => {

  const { user, idToken } = UserAuth();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: user ? user.email : '',
    idToken: idToken ? idToken : '',
    iotDeviceSerial: '',
    droneSerial: '',
    country: '',
    farmName: '',
    landSize: '',
    farmingType: '',
    contact: ''
  });

  const farmingTypes = [
    'Seasonal Farming',
    'Horticulture Farming',
    'Hydroponics Farming',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
  
    const requestData = {
      message: formData.message,
      user_name: formData.user_name,
      user_email: formData.user_email,
      idToken: formData.idToken,
      iotDeviceSerial: formData.iotDeviceSerial,
      droneSerial: formData.droneSerial,
      country: formData.country,
      farmName: formData.farmName,
      landSize: formData.landSize,
      farmingType: formData.farmingType,
      contact: formData.contact
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/register-farm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${idToken}`, 
        },
        body: JSON.stringify(requestData),
      });

      console.log(response);

      const intent_response = await response.json();
      console.log(intent_response);
  
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };
  
  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        user_email: user.email,
        idToken: idToken
      }));
    }
  }, [user, idToken]);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#e6f2e6' }}>
      <Row className="justify-content-center mt-5" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflowY: 'auto', maxHeight: '80vh' }}>
        <Col>
          <h2 className="text-center" style={{ color: '#388e3c' }}>Add Farm Details</h2>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3 mt-5">
              <Col>
                <CustomInput
                  id="user_name"
                  label="User Name"
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <CustomInput
                  id="farm_name"
                  label="Farm Name"
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <CustomInput
                  id="iot_device_serial"
                  label="IoT Device Serial"
                  type="text"
                  name="iotDeviceSerial"
                  value={formData.iotDeviceSerial}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <CustomInput
                  id="drone_serial"
                  label="Drone Serial"
                  type="text"
                  name="droneSerial"
                  value={formData.droneSerial}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <CustomInput
                  id="country"
                  label="Country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <CustomInput
                  id="contact"
                  label="User Contact"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <CustomInput
                  id="land_size"
                  label="Land Size/ha"
                  type="text"
                  name="landSize"
                  value={formData.landSize}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <CustomSelect
                  id="farming_type"
                  label="Select Farming Type"
                  name="farmingType"
                  value={formData.farmingType}
                  onChange={handleChange}
                  required
                >
                  <option value=""></option>
                  {farmingTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </CustomSelect>
              </Col>
            </Row>
            <Button variant="success" type="submit" className="mt-3" style={{ width: '100%', backgroundColor: '#388e3c', borderColor: '#388e3c' }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmDataForm;
