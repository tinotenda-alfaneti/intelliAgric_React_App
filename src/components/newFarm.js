import Swal from 'sweetalert2';
import CustomInput from './customizedIcons/input';
import CustomSelect from './customizedIcons/select';
import { ENDPOINTS } from '../constants';
import { UserAuth } from "../context/authContext";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const FarmDataForm = () => {
  const [loading, setLoading] = useState(false);

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
    contact: '',
    location:"",
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
    setLoading(true);
  
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
      contact: formData.contact,
      contact: formData.location
    };
  
    Swal.fire({
      title: 'Saving...',
      text: 'Please wait while we save your information.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  
    try {
      const response = await fetch(ENDPOINTS.REGISTER_FARM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${idToken}`, 
        },
        body: JSON.stringify(requestData),
      });
  
      console.log(response);
  
      const check_status = await response.json();
      console.log(check_status.status);
      // Check if the response status is OK
      if (check_status.status === "success") {
        Swal.close(); // Close the loading alert
        Swal.fire({
          title: 'Success!',
          text: 'Your information has been saved.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.close(); // Close the loading alert
        Swal.fire({
          title: 'Error!',
          text: 'There was an error saving your information.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.close(); // Close the loading alert
      Swal.fire({
        title: 'Error!',
        text: 'There was an error saving your information.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
        {/*TO DO:  insert an image tag on top of the label */}
        {/* <img 
          src="/intelliagric.png" 
          className="img-center" 
          style={{ display: 'block', margin: '0 auto', width: '450px', height: '450px' }} 
          alt="Description of the image" 
        /> */}

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
                  id="location"
                  label="Location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <CustomInput
                  id="agronomist"
                  label="Agronomist"
                  type="text"
                  name="agronomist"
                  // value={formData.contact}
                  // onChange={handleChange}
                  // required
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