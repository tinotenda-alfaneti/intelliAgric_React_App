import React from 'react';
import { Row } from 'react-bootstrap';
import WelcomeMessage from './welcomeMessage'; // Adjust import path as per your file structure
import GraphCard from '../components/cards/clickableCard';

const ChatHelperTag = ({
  sidebar,
  handleOutbreakAlerts,
  handleDiseaseDetection,
  handleMarketPrediction,
}) => {
  return (
    <Row
      className="justify-content-center"
      style={{
        width: '100%',
        overflowY: 'auto',
        marginLeft: sidebar ? '10vw' : '0',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <WelcomeMessage />
      <GraphCard
        title="Click to View Outbreaks"
        subtitle="Alerts"
        onClick={handleOutbreakAlerts}
        className="home-graph-card"
      />
      <GraphCard
        title="Click to Predict"
        subtitle="Disease"
        onClick={handleDiseaseDetection}
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
