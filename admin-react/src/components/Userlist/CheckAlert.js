import React from 'react';
import styled from 'styled-components';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AskModalBlock = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  
  .owo {
      width: 100%;
      height: 40px;
      margin: 1px;
  }
`;


const CheckAlert = ({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <AskModalBlock>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <button onClick={onCancel} className="owo">{cancelText}</button>
          <button onClick={onConfirm} className="owo">{confirmText}</button>
        </div>
      </AskModalBlock>
    </Fullscreen>
  );
};

export default CheckAlert;