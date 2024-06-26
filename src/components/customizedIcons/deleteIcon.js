// components/ChatIcon.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chatIcon.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteIcon = ({ handleClearChat }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    console.log("Delete Chat Clicked");
    handleClearChat();
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="chat-icon-wrapper"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: hovered ? '#66A861' : '#28a745', // light green on hover, green otherwise
        color: hovered? 'black' : 'white',
        borderRadius: '50%',
        width: '60px', // increase the width and height
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: hovered ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'background-color 0.3s, box-shadow 0.3s'
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FontAwesomeIcon icon={faTrash} size="2x" />
      
    </div>
  );
};

export default DeleteIcon;
