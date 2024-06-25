import React from 'react';
import { Col } from 'react-bootstrap';

const GraphCard = ({ title, value, unit, image, onClick }) => {
  return (
    <Col xs={4} sm={4} md={4} lg={2} xl={2} className="mb-1 clickable-col" onClick={onClick}>
      <div className="content">
        {image && <img src={image} alt="Card Image" className="img-fluid mb-2" />}
        {title && <h5 className="mb-1" style={{ fontSize: '20px' }}>{title}</h5>} 
        {value && <p className="mb-0">{value} {unit}</p>}
      </div>
    </Col>
  );
};

export default GraphCard;
