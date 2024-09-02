'use client'

import { useState , useEffect} from 'react';
import styles from './aadhar.module.css';

const AadharVerificationPage = () => {
  const [message, setMessage] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const storedEmail = sessionStorage.getItem('email');
  const [messageType, setMessageType] = useState('');


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
          setMessageType('success');
        }
        else{
          setMessage('Invalid Aadhar');
          setMessageType('error');
        }
      } else {
        const error = await response.text();
        setMessage(`Verification failed: ${error}`);
        setMessageType('error');
      }
    } catch (error:any) {
      setMessage(`An error occurred: ${error.message}`);
      setMessageType('error');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Aadhaar Verification</h1>
      <p className={styles.description}>Verifying your Aadhaar number - {aadharNumber}</p>
      <button onClick={handleVerifyAadhar} className={styles.button}>Verify Aadhaar</button>
      {message && (
        <p className={`${styles.message} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
          {message}
        </p>
      )}
      {message.startsWith('Aadhaar verified') && (
      <div className={styles.details}>
        <a href='/address' className={styles.verifyButton}>Check address</a>
      </div>
    )} 
    </div>
    
  );
};

export default AadharVerificationPage;
