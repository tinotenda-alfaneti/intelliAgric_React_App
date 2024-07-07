import React from 'react';
import { Col } from 'react-bootstrap';
import "../../styles/clickableCol.css";

/* 
  A responsive container that adjusts gracefully across all screen sizes (xs, sm, md, lg, xl) 
  with clickable functionality and optional blinking effect.
*/

const GraphCard = ({ subtitle, title, value, image, onClick, tempUnit, phUnit, moisUnit, npkUnit, isBlinking }) => {
  return (
    <Col xs={6} sm={2} md={2} lg={2} xl={2} className={`${"mb-0 clickable-col"} ${isBlinking ? 'blinking' : ''}`} onClick={onClick}  > 
      <div className="content">
        {image && <img src={image} alt="Card Image" className="img-fluid mb-2" />}
        {title && <h5 className="mb-0 mt-1" >{title}</h5>} 
        {subtitle && <h5 className="mb-0" >{subtitle}</h5>} 
        {value && <p className="mb-0">{value} {tempUnit} {phUnit} {moisUnit} {npkUnit}</p>}
      </div>
    </Col>
  );
};

export default GraphCard;
