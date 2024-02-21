import React, { useState } from 'react';
import { message } from 'antd';
import './OTPInput.css';

export default function OTPInput({ length }) {
    const [otp, setOTP] = useState(new Array(length).fill(''));

    const handleOTPChange = (event, index) => {
        if(isNaN(event.target.value)) return;

        setOTP([
            ...otp.map((data, idx) => (idx === index ? event.target.value : data))
        ]);

        if(event.target.value && index < length - 1) {
            event.target.nextElementSibling.focus();
        }
    }

    const handleBackspace = (event, index) => {
        if(event.key === 'Backspace' && index > 0 && !event.target.value) {
            event.target.previousElementSibling.focus();
        }
    }

    const handleComplete = () => {
        // Check if all the OTP fields are filled
        if(otp.includes('')) return message.error('Please fill all the fields');
        message.success('OTP: ' + otp.join(''));
    }

    return (
        <div className="otp-container">
            <div className="otp-field">
                {otp.map((data, index) => (
                    <input
                        key={index}
                        type="text"
                        value={data}
                        maxLength={1}
                        onChange={(event) => handleOTPChange(event, index)}
                        onKeyDown={(event) => handleBackspace(event, index)}
                    />
                ))}
            </div>
            <div>
                <button onClick={() => handleComplete()}>Submit</button>
            </div>
        </div>
    )
};
