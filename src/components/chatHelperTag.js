import React from 'react';
import { Row } from 'react-bootstrap';
import WelcomeMessage from './welcomeMessage'; // Adjust import path as per your file structure
import GraphCard from '../components/cards/clickableCard';

const ChatHelperTag = ({
  handleDiseaseDetection,
  handleOutbreakAlerts,
  handleMarketPrediction,
  disease,
}) => {

  return (
    <Row className="justify-content-center">
      <WelcomeMessage />
      <GraphCard
        title="Click to Predict"
        subtitle="Disease"
        onClick={handleDiseaseDetection}
        className="home-graph-card"
      />
      <GraphCard
        title={disease !== null ? disease : 'No disease alerts identified'}
        subtitle= "Click for recommendation"
        onClick={handleOutbreakAlerts}
        isBlinking={disease !== null}
        className="home-graph-card"
      />
      <GraphCard
        title="Click to Predict"
        subtitle="Market"
        onClick={handleMarketPrediction}
        className="home-graph-card"
      />
    </Row>
  );
};

export default ChatHelperTag;
