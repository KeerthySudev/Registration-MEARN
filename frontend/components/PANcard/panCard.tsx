'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PanVerificationPage = () => {
  const [message, setMessage] = useState('');
  const [pan, setPan] = useState('');
  const router = useRouter();

  const PanCard = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/PAN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ PAN: pan }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.responseData.result
        console.log(data)
        if(data.link_status == true){
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
      <h1>PAN</h1>
      <input
        type="text"
        placeholder="Enter PAN number"
        value={pan}
        onChange={(e) => setPan(e.target.value)} // Update the PIN state on user input
      />
      <button onClick={PanCard}>PAN Number</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PanVerificationPage;
