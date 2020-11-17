import React from "react";

function CodeSendButton({ codeSend, className, BtnName }) {
  return (
    <>
      <button className={className} onClick={codeSend}>
        {BtnName}
      </button>
    </>
  );
}

export default CodeSendButton;
