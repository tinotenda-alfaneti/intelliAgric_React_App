import '../styles/navBar.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFarm } from '../context/farmContext';
import { UserAuth } from "../context/authContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav, Container, Dropdown , Row, Col} from 'react-bootstrap';
import { faUser, faNewspaper, faShoppingCart, faMapMarkerAlt, faCloud, faHomeAlt, faMap, faTractor, faWheatAwn } from '@fortawesome/free-solid-svg-icons';



function HomeNavBar() {
  const [success, setSuccess] = useState(false);
  const { user, logout, idToken } = UserAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const { farmData } = useFarm() || {};

  const isFarmPage = location.pathname === '/farmhome';
  const isIoTPage = location.pathname === '/farmhome/iot';

  const handleLogout = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await logout();
    } catch (e) {
      setError('Logout failed: ' + e.message);
      console.error("Logout error", e);
    }
  };

  const getInitials = (email) => {
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <Navbar bg="#66A861" expand="md" variant="light" style={navBarStyle}>
        <Container className='pl-0 pr-3' fluid>

          <Navbar.Toggle aria-controls="basic-navbar-nav ms-auto pr-2 border-0 text-white" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto d-flex justify-content-center w-100" style={{ width: '100%', justifyContent: 'center' }}> */}
            <Nav className="me-auto d-flex justify-content-center w-100 pt-89 fw-bold">
              {isFarmPage || isIoTPage ? (
                <>
                  <Nav.Link href="/" className="fw-bold" style={navLinkStyle}>
                    <FontAwesomeIcon icon={faHomeAlt} style={iconStyle} />
                    <p>Home</p>
                  </Nav.Link>
                  <Nav.Link href="/farmhome" style={navLinkStyle}>
                      <FontAwesomeIcon icon={faWheatAwn} style={iconStyle} />
                      <p>{farmData?.farm_name || "Farm Name Not Available"}</p>
                  </Nav.Link>
                  <Nav.Link href="/farmhome" style={navLinkStyle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
                    <p>{farmData?.country || "Country Not Available"}</p>
                  </Nav.Link>
                  <Nav.Link href="/farmhome" style={navLinkStyle}>
                    <FontAwesomeIcon icon={faCloud} style={iconStyle} />
                    <p>{farmData?.weather_conditions || "Weather Not Available"}</p>
                  </Nav.Link>
                  <Nav.Link href="/farmhome" style={navLinkStyle}>
                    <FontAwesomeIcon icon={faMap} style={iconStyle} />
                    <p>{farmData?.land_size || "Size Not Available"} Ha</p>
                  </Nav.Link>
                </>
              ) : (
                <>

                  {farmData ? (
                    <Nav.Link href="/farmhome" style={navLinkStyle}>
                      <FontAwesomeIcon icon={faWheatAwn} style={iconStyle} />
                      MyFarm
                    </Nav.Link>
                  ) : (
                    <Nav.Link href="/farmhome/addfarm" style={navLinkStyle}>
                      <FontAwesomeIcon icon={faWheatAwn} style={iconStyle} />
                      MyFarm
                    </Nav.Link>
                  )}


                  <Nav.Link href="/agrinews" style={navLinkStyle}>
                    <FontAwesomeIcon icon={faNewspaper} style={iconStyle} />
                    AgriNews
                  </Nav.Link>
                  <Nav.Link href="/agrishare" style={navLinkStyle}>
                    <FontAwesomeIcon icon={faTractor} style={iconStyle} />
                    EquipShare
                  </Nav.Link>
                  <Nav.Link href="/ecommerce" style={navLinkStyle}>
                    <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
                    E-commerce
                  </Nav.Link>

                </>
              )}
            </Nav>

            <Nav className="ms-auto">
              {user ? (
                <Dropdown align="end" style={{ position: 'relative' }}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    id="dropdown-custom-components"
                    style={dropdownToggleStyle}
                  >
                    <div style={initialsCircleStyle}>
                      <span style={{ color: 'black' }}>{getInitials(user.email)}</span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={dropdownStyle}>
                    <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>

                    {/* i want to check if the user has a farm or not  */}

                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown align="end" style={{ position: 'relative' }}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    id="dropdown-custom-components"
                    style={dropdownToggleStyle}
                  >
                    <div style={initialsCircleStyle}>
                      <FontAwesomeIcon icon={faUser} style={{ color: '#66A861' }} />
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

    </IconContext.Provider>
  );
}

const navLinkStyle = {
  fontSize: '15px',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 20px',
  textAlign: 'center'
};

const iconStyle = {
  marginBottom: '5px',
  color: 'white'
};

const dropdownToggleStyle = {
  fontSize: '18px',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 10px',
  padding: '0',
  position: 'relative',
  cursor: 'pointer',
};

const initialsCircleStyle = {
  backgroundColor: 'white',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  backgroundColor: '#66A861',
};

export default HomeNavBar;