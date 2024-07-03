import '../../styles/chatIcon.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FontAwesomeIcon icon={faTrash} className="icon"/>
      
    </div>
  );
};

export default DeleteIcon;
