import React from 'react';
import styled from 'styled-components';

// Styled component for the input block with floating label
const InputBlock = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 10px 10px 10px;
  outline: none;

  &:focus {
    border-color: #388e3c;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -15px;
    left: 12px;
    font-size: 12px;
    color: #388e3c; /* Change the color of the label when focused */
  }
`;


const StyledLabel = styled.label`
  position: absolute;
  top: -15px;
  left: 13px;
  color: #6c757d; /* Label color */
  font-size: 10px;
  transition: top 0.2s, font-size 0.2s;
`;

const CustomInput = ({ id, label, ...rest }) => {
  const handleFocus = (event) => {
    const labelElement = event.target.parentNode.querySelector('label');
    labelElement.style.top = '-10px';
    labelElement.style.fontSize = '12px';
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      const labelElement = event.target.parentNode.querySelector('label');
      labelElement.style.top = '12px';
      labelElement.style.fontSize = '16px';
    }
  };

  return (
    <InputBlock>
      <StyledInput
        id={id}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </InputBlock>
  );
};

export default CustomInput;

