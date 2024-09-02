'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const OtpVerificationPage = () => {
  const router = useRouter();
  const email = sessionStorage.getItem('email');
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);

  // Function to handle sending OTP
  const handleSendOtp = async () => {
    setIsSendingOtp(true);
    setMessage(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/emailVerify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('OTP sent successfully! Please check your email.');
      } else {
        setMessage('Error sending OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Error sending OTP. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Function to handle verifying OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyingOtp(true);
    setMessage(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({otp }),
      });

      if (response.ok) {
        setMessage('OTP verified successfully!');
        router.push('/authentication/aadhar');
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Error verifying OTP. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>OTP Verification</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Request OTP</h2>
        <button
          onClick={handleSendOtp}
          disabled={isSendingOtp}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}
        >
          {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </div>

      <div>
        <h2>Verify OTP</h2>
        <form onSubmit={handleVerifyOtp}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="otp" style={{ display: 'block', marginBottom: '8px' }}>Enter OTP:</label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>
          <button
            type="submit"
            disabled={isVerifyingOtp}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            {isVerifyingOtp ? 'Verifying OTP...' : 'Verify OTP'}
          </button>
        </form>
      </div>

      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default OtpVerificationPage;
