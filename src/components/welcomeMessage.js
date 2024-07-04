// WelcomeMessage.js
import React from 'react';
import '../styles/welcomeMessage.css'; // Create this CSS file for specific styles

const WelcomeMessage = () => {
  return (

    <div className="welcome-message">
      <p className="welcome-text">
        Welcome To IntelliAgric - Your Intelligent Farm Assistant! <br/> Here you can
      </p>
      <ul className="welcome-list">
        <li>Get real-time disease alerts and information about outbreaks.</li>
        <li>Predict plant diseases by uploading images of your crops.</li>
        <li>Receive market predictions and insights for agricultural products.</li>
        <li>or type your question in the text box below</li>
      </ul>
    </div>
  );
};

export default WelcomeMessage;
