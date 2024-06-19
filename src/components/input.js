import React from 'react';
import styled from 'styled-components';

// Styled component for the input block with floating label
const InputBlock = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;


const StyledLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 12px;
  color: #6c757d; /* Label color */
  font-size: 12px;
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
      {/* <Placeholder>{label}</Placeholder> */}
    </InputBlock>
  );
};

export default CustomInput;