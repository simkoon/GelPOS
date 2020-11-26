import React from 'react';
import CheckAlert from './CheckAlert';

const AskRemove = ({visible, onConfirm, onCancel}) => {
    return (
        <CheckAlert
            visible={visible}
            title="유저 탈퇴"
            description="해당 유저를 탈퇴시키시겠습니까?"
            confirmText="탈퇴"
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};

export default AskRemove;