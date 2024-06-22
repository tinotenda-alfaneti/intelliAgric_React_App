import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faShoppingCart, faUser, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from "../context/authContext"; 
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../constants'
import FarmHomePage from '../pages/farmHomePage';

function HomeNavBar() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user, logout, idToken } = UserAuth(); 
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      // Perform the sign-out operation
      await logout();

      // Send the logout request to the backend
      const response = await fetch(ENDPOINTS.LOGOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ token: idToken }),
      });

      console.log("LogOut Response", response);

      // Assuming the logout endpoint returns a success message or status
      if (response.ok) {
        console.log("Logout successful");
        navigate('/');
      } else {
        // Handle errors from backend response
        const errorData = await response.json(); 
        setError('Logout failed: ' + errorData.message);
        console.log("Logout failed", errorData);
      }
    } catch (e) {
      setError('Logout failed: ' + e.message);
      console.error("Logout error", e);
    }
  };

  const getInitials = (email) => {
    return email.slice(0, 2).toUpperCase(); 
  };

  return (
    <Navbar bg="#d3d3d3" expand="md" variant="light" style={navBarStyle}>
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: '30px', fontWeight: 'bold', color: 'black', marginLeft: '300px', marginTop: '15px' }}></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/agrinews" style={{ fontSize: '15px', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
              <FontAwesomeIcon icon={faNewspaper} style={{ marginBottom: '5px', color: 'black' }} />
              AgriNews
            </Nav.Link>
            <Nav.Link href="/agrishare" style={{ fontSize: '15px', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
              <FontAwesomeIcon icon={faHandshake} style={{ marginBottom: '5px', color: 'black' }} />
              AgriShare
            </Nav.Link>
            <Nav.Link href="#home" style={{ fontSize: '15px', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ marginBottom: '5px', color: 'black' }} />
              E-commerce
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {user ? (
              <Dropdown align="end" style={{ position: 'relative' }}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-custom-components"
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 10px',
                    padding: '0',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ color: 'black' }}>{getInitials(user.email)}</span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu style={dropdownStyle}>
                  <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
                  <Dropdown.Item href="/farmhome">My Farm</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Dropdown align="end" style={{ position: 'relative' }}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-custom-components"
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 10px',
                    padding: '0',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} />
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu style={dropdownStyle}>
                  <Dropdown.Item href="/signin">Sign in</Dropdown.Item>
                  <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const styles = `
  .dropdown-toggle::after {
    display: none !important;
  }
`;

const dropdownStyle = {
  position: 'absolute',
  zIndex: 1000,
};


const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


const navBarStyle = {
  fontSize: '15px',
  fontFamily: 'Poppins',
  backgroundColor: '#d3d3d3', 
};

export default HomeNavBar;
