// WelcomeMessage.js
import React from 'react';
import '../styles/welcomeMessage.css'; // Create this CSS file for specific styles

const WelcomeMessage = () => {
  return (
      <div className="welcome-message">
        <p className="welcome-text">
          Welcome To IntelliAgric 
        </p>
        <p className='farm-assistant'>Your Intelligent Farm Assist. Where You Can:-</p>
        <ul className="welcome-list">
          <li>Get real-time disease alerts and information about outbreaks.</li>
          <li>Predict plant diseases by uploading images of your crops.</li>
          <li>Receive market predictions and insights for agricultural products.</li>
          <li>or Type your question in the text box below</li>
        </ul>
      </div>
  );
};

export default WelcomeMessage;
