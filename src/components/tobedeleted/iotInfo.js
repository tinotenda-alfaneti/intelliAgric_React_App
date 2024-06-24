// import Swal from 'sweetalert2';
// import '../styles/droneMain.css';
// import "bootstrap/dist/css/bootstrap.min.css"; 
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col} from "react-bootstrap"; 
// import '../styles/iotcss.css';
// import { useSoilData } from '../context/iotContext';
// import TempModal from './modals/chartModal';
// import TempBtn from './cards/graphCard';
// import ColCard from './cards/colCard';

// const IoTInfo=({ handleTemperatureClick })=>{
//   const [maxScrollHeight, setMaxScrollHeight] = useState(0);
//   useEffect(() => {
//     const windowHeight = window.innerHeight;
//     const calculatedMaxScrollHeight = windowHeight -200; 
//     setMaxScrollHeight(calculatedMaxScrollHeight);
//   }, []);

//   const handleClick = (url) => {
//     window.location.href = url;
//   };

//   const { soilData, setSoilData } = useSoilData();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true); // Set loading to true when fetching data

//     // Example of handling loading state while fetching
//     const fetchData = async () => {
//       if (!soilData) {
//         // Show loading indicator using SweetAlert
//         Swal.fire({
//           title: 'Loading...',
//           allowOutsideClick: false,
//           didOpen: () => {
//             Swal.showLoading();
//           }
//         });

//         try {
//           // Simulate fetching data (replace with actual fetch)
//           await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

//           // Example: Set soilData after fetching
//           setSoilData({
//             temp: '25°C',
//             mois: 'Medium',
//             ph: 'Neutral',
//             npk: 'Balanced'
//           });

//           // Close SweetAlert on success
//           Swal.close();
//         } catch (error) {
//           console.error('Error fetching soil data:', error);

//           // Show error using SweetAlert
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to fetch soil data.',
//           });
//         } finally {
//           setLoading(false); // Set loading to false after fetching (or error)
//         }
//       }
//     };

//     fetchData();
//   }, [soilData, setSoilData]);


//   return (
//     <div style={{ maxHeight: `${maxScrollHeight}px`, overflowY: 'auto' }}>
//       <Container fluid className="mt-5">
//         <Row className="justify-content-center">
//           <TempBtn
//             title="Soil Temperature"
//             value="20"  // Replace with actual value
//             unit="deg. C"
//             onClick={handleTemperatureClick} // Replace with your onClick handler
//           />
//           <TempBtn
//             title="Soil Moisture"
//             value="50"  // Replace with actual value
//             unit="%"
//             // onClick={handleMoistureClick} // Replace with your onClick handler
//           />
//           <TempBtn
//             title="Soil NPK"
//             value="10"  // Replace with actual value
//             unit="mg/kg"
//             // onClick={handleNPKClick} // Replace with your onClick handler
//           />
//           <TempBtn
//             title="Soil NPK"
//             value="10"  // Replace with actual value
//             unit="mg/kg"
//             // onClick={handleNPKClick} // Replace with your onClick handler
//           />
//         </Row>
//       </Container>
//     </div>
//   );
  


//   // return ( 
//   //   <div style={{ maxHeight: `${maxScrollHeight}px`, overflowY: 'auto' }}>
//   //     <Container fluid className="mt-5">
//   //       <Row className="justify-content-center" >

//   //         <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-4 clickable-col" onClick={TempBtn}>
//   //             <div className="content">
//   //                 <div className="text-center">
//   //                     <h5 className="mb-1"style={{fontSize:'20px'}}>Soil Temperature</h5>
//   //                     <p className="mb-0"> deg. C</p>
//   //                 </div>
//   //             </div>
//   //         </Col>

//   //         <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-4 clickable-col" onClick={() => handleClick('https://example.com')}>
//   //             <div className="content">
//   //                 <div className="text-center">
//   //                     <h5 className="mb-1" style={{fontSize:'20px'}}>Soil Moisture </h5>
//   //                     <p className="mb-0">%</p>
//   //                 </div>
//   //             </div>
//   //         </Col>

//   //         <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-4 clickable-col" onClick={() => handleClick('https://example.com')}>
//   //             <div className="content">
//   //                 <div className="text-center">
//   //                     <h5 className="mb-1" style={{fontSize:'20px'}}>Soil pH</h5>
//   //                     <p className="mb-0">deg. C</p>
//   //                 </div>
//   //             </div>
//   //         </Col>

//   //         <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-4 clickable-col" onClick={() => handleClick('https://example.com')}>
//   //             <div className="content">
//   //                 <div className="text-center">
//   //                     <h5 className="mb-1" style={{fontSize:'20px'}}>Soil NPK</h5>
//   //                     <p className="mb-0">mg/kg</p>
//   //                 </div>
//   //             </div>
//   //         </Col>

//   //       </Row>
//   //     </Container>
//   //   </div>
//   // );
// };

// export default IoTInfo;