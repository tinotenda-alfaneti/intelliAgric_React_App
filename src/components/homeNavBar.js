import 'bootstrap/dist/css/bootstrap.min.css';  
import {Nav, Navbar, Container, Dropdown} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faShoppingCart, faQuestion, faUser} from '@fortawesome/free-solid-svg-icons';

const dropdownStyle = {
  position: 'absolute',
  zIndex: 1000,
};

function HomeNavBar() {  
  return ( 
    <Navbar bg="black" expand="md" variant="black" style={{fontSize: '20px', backgroundColor: 'black'}}>
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginLeft: '-110px', marginTop:'15px' }}>intelliAgric</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/iot" style={{ fontSize: '18px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft:'100px', margin: '0 10px' }}>
              <FontAwesomeIcon icon={faHome} style={{ marginBottom: '5px', color: 'white' }} /> 
              IoT Device Management
            </Nav.Link>  
            <Nav.Link href="/diseasedetection" style={{ fontSize: '18px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
              <FontAwesomeIcon icon={faSearch} style={{ marginBottom: '5px', color: 'white' }} /> 
              Maize Disease Detection
            </Nav.Link>  
            <Nav.Link href="#home" style={{ fontSize: '18px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ marginBottom: '5px', color: 'white' }} /> 
              E-commerce platform
            </Nav.Link>  
            <Nav.Link href="/askai" style={{ fontSize: '18px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
              <FontAwesomeIcon icon={faQuestion} style={{ marginBottom: '5px', color: 'white' }} /> 
              Ask IntelliAgric
            </Nav.Link>  
          </Nav>

          <Nav className="ms-auto">
          <Dropdown align="end" style={{ position: 'relative' }}>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components" style={{ fontSize: '18px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px', padding: '0' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu style={dropdownStyle}>
              <Dropdown.Item href="/signin">Sign in</Dropdown.Item>
              <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>

        </Navbar.Collapse>    
      </Container>  
    </Navbar>
  );
};

export default HomeNavBar;  