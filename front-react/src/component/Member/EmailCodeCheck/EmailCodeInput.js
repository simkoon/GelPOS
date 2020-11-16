import React from "react";

function EmailCodeInput({email, onChange, className, readOnly, required }) {

    return (
        <>
            <input
                className={className}
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                autoComplete="off"
                maxLength="24"
                placeholder="이메일"
                readOnly={readOnly}
                required={required}
            />
        </>
    );
    }

    export default EmailCodeInput;
