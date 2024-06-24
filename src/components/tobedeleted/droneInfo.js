// import '../styles/droneMain.css';
// import "bootstrap/dist/css/bootstrap.min.css"; 
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col} from "react-bootstrap"; 
// import ImgCard from './cards/imgCard';

// const DroneInfo=()=>{
//   const [maxScrollHeight, setMaxScrollHeight] = useState(0);

//   useEffect(() => {
//     const windowHeight = window.innerHeight;
//     const calculatedMaxScrollHeight = windowHeight -200; 
//     setMaxScrollHeight(calculatedMaxScrollHeight);
//   }, []);

//   const handleClick = (url) => {
//     window.location.href = url;
//   };

//   return ( 
//     <div style={{ maxHeight: `${maxScrollHeight}px`, overflowY: 'auto' }}>
//       <Container fluid className="mt-5">
//         <Row className="justify-content-center" >

//           <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-4 clickable-col" onClick={() => handleClick('https://example.com')}>
//             <div className="content">
//             <img src="/maizeleaves.jpg" alt="Image 3" className="img-fluid mb-2" />
//             </div>
//           </Col>

//           <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-4 clickable-col" onClick={() => handleClick('https://example.com')}>
//             <div className="content">
//             <img src="/maizeleaves.jpg" alt="Image 3" className="img-fluid mb-2" />
//             </div>
//           </Col>

//           <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-4 clickable-col" onClick={() => handleClick('https://example.com')}>
//             <div className="content">
//              <img src="/maizeleaves.jpg" alt="Image 3" className="img-fluid mb-2" />
//             </div>
//           </Col>

//           <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-4 clickable-col" onClick={() => handleClick('https://example.com')}>
//             <div className="content">
//            <img src="/maizeleaves.jpg" alt="Image 3" className="img-fluid mb-2" />
//             </div>
//           </Col>

//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default DroneInfo;