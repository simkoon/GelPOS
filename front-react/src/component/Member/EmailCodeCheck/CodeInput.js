import React from "react";

function CodeInput({ className, code, onChange, required, readOnly  }) {

    return (
        <>
            <input
                className={className}
                value={code}
                onChange={onChange}
                name="code"
                type="text"
                autoComplete="off"
                maxLength="5"
                placeholder="인증코드"
                required={required}
                readOnly={readOnly}
            />
        </>
    );
    }

export default CodeInput;