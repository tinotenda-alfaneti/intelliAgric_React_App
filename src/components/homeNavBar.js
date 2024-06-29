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
import { faUser, faNewspaper, faShoppingCart, faMapMarkerAlt, faCloud, faHomeAlt, faMap, faTractor } from '@fortawesome/free-solid-svg-icons';

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
        <Container fluid style={{ paddingLeft: 0, paddingRight: '10px' }}>

          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginLeft: 'auto', paddingRight: '2px', border: 'none', color: 'white' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ width: '100%', justifyContent: 'center' }}>
              {isFarmPage || isIoTPage ? (
                <>
                  <Nav.Link href="/farmhome" style={navLinkStyle}>
                    <FontAwesomeIcon icon={faHomeAlt} style={iconStyle} />
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
                    <Dropdown.Item href="/farmhome">My Farm</Dropdown.Item>
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

    </IconContext.Provider>
  );
}

const navLinkStyle = {
  fontSize: '15px',
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 20px',
  textAlign: 'center'
};

const iconStyle = {
  marginBottom: '5px',
  color: 'black'
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