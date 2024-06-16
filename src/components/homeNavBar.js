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
    <Navbar bg="#d3d3d3" expand="md" variant="black" style={{fontSize: '20px', backgroundColor: '#d3d3d3', fontFamily: 'Poppins' }}>
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: '30px', fontWeight: 'bold', color: 'black', marginLeft: '200px', marginTop:'15px' }}></Navbar.Brand>       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/agrinews" style={{ fontSize: '18px', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
              <FontAwesomeIcon icon={faHome} style={{ marginBottom: '5px', color: 'black' }} /> 
              AgriNews
            </Nav.Link>  
            <Nav.Link href="/agrishare" style={{ fontSize: '18px', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
              <FontAwesomeIcon icon={faSearch} style={{ marginBottom: '5px', color: 'black' }} /> 
              AgriShare Platform
            </Nav.Link>  
            <Nav.Link href="#home" style={{ fontSize: '18px', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ marginBottom: '5px', color: 'black' }} /> 
              E-commerce Platform
            </Nav.Link>  
          </Nav>
         
          <Nav className="ms-auto">
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
                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default HomeNavBar;  