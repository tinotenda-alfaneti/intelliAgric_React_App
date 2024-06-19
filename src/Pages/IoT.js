import React,{ useState } from 'react';
import { Container, Row, Col} from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import HomeNavBar from "../components/homeNavBar";
import '../App.css';

const IoT=()=>{
  return (        
    <div>
      <HomeNavBar/>
      <Container fluid className="mt-5">
        <Row className="justify-content-center">

        <Col xs={12} md={10} lg={8} xl={10}>
          <div className="border p-4 d-flex">
            <div className="flex-grow-1">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas 
                  volutpat blandit aliquam etiam. Gravida arcu ac tortor dignissim convallis aenean et.
                  Nullam ac tortor vitae purus. Scelerisque felis imperdiet proin fermentum leo vel. Nam at
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      </Container>
    </div> 
  );
};

export default IoT;



    {/* <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <p>Token, {idToken}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please sign in to access data.</p>
      )}
    </div> */}