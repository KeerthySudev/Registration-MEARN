'use client'

import { Router } from '@/../node_modules/react-router-dom/dist/index';
import { useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';

const AadharVerificationPage = () => {
//   const [aadharNumber, setAadharNumber] = useState('');
  const [message, setMessage] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  // const aadharNumber = '210488171985'
  const router = useRouter();
  const storedEmail = sessionStorage.getItem('email');


  useEffect(() => {
    // Retrieve the email from session storage
    

    if (storedEmail) {
      fetch(`http://localhost:5000/api/users/verify?email=${encodeURIComponent(storedEmail)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setAadharNumber(data.aadhaar);
        })
        
    } 
  }, []);


  const handleVerifyAadhar = async () => {
    try {
      
      const response = await fetch('http://127.0.0.1:5000/api/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadharNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.responseData.data==true){
          setMessage('Aadhaar verified');
          router.push('/address');
        }
        else{
          setMessage('Invalid Aadhar');
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
      <h1>Aadhar Verification</h1>
      <button onClick={handleVerifyAadhar}>Verify Aadhar</button>
      {message && <p>{message}</p>}
      <a href='/address'>AAdhar</a>
    </div>
    
  );
};

export default AadharVerificationPage;
