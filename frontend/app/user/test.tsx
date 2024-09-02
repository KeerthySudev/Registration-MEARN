'use client'

import { useState } from 'react';

const GstVerificationPage = () => {
  const [message, setMessage] = useState('');
  const [GST, setGST] = useState('');

  const VerifyGST = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/GST', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ GST: GST }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.responseData.result.source_output
        console.log(data)
        if(data.gstin_status=="Active"){
          setMessage('Verified')
        }
        else{
          setMessage('Invalid')
        }
      } else {
        const error = await response.text();
        setMessage(`Verification failed: ${error}`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>GST</h1>
      <input
        type="text"
        placeholder="Enter GST number"
        value={GST}
        onChange={(e) => setGST(e.target.value)} // Update the PIN state on user input
      />
      <button onClick={VerifyGST}>GST Number</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default GstVerificationPage;
