import React from 'react';
import styled from 'styled-components';

// Styled component for the input block with floating label
const InputBlock = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  appearance: none; /* Remove default arrow */

  &:focus {
    border-color: #388e3c;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 12px;
  color: #388e3c; /* Label color */
  font-size: 12px;
  transition: top 0.2s, font-size 0.2s;
`;

const CustomSelect = ({ id, label, children, ...rest }) => {
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
      <StyledSelect
        id={id}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </StyledSelect>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </InputBlock>
  );
};

export default CustomSelect;
