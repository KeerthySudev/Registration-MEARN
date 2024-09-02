'use client'

import { useState } from 'react';
import styles from './address.module.css';


const AddressLookupPage = () => {
  const [message, setMessage] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');

  const addressLookup = async () => {
    if (!pin) {
      setMessage('PIN code is required');
      return;
    }

    if (!/^\d{6}$/.test(pin)) {
      setMessage('PIN must be a 6-digit number');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ PIN: pin }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.responseData[0];

        if (data && data.Status === "Success") {
          const postOffices = data.PostOffice;

          if (postOffices && postOffices.length > 0) {
            setCity(postOffices[0].Name);
            setDistrict(postOffices[0].District);
            setState(postOffices[0].State);
          } else {
            setMessage('No PostOffice data found.');
          }
        } else {
          setMessage('No data or unsuccessful status.');
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
    <div className={styles.container}>
    <h1 className={styles.header}>Address Lookup</h1>
    <input
      type="text"
      placeholder="Enter PIN number"
      value={pin}
      onChange={(e) => setPin(e.target.value)}
      className={styles.input}
    />
    <button onClick={addressLookup} className={styles.button}>Check</button>

    {message && <p className={styles.message}>{message}</p>}

    {city && (
      <div className={styles.details}>
        <h2>Address Details:</h2>
        <p><strong>PinCode:</strong> {pin}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>District:</strong> {district}</p>
        <p><strong>State:</strong> {state}</p>
        <a href='/authentication/PanCard' className={styles.verifyButton}>Verify PAN</a>
      </div>
    )}
  </div>
  );
};

export default AddressLookupPage;
