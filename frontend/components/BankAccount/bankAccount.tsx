'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BankVerificationPage = () => {
  const [message, setMessage] = useState('');
  const [AcNo, setAcNo] = useState('');
  const [IFSC, setIFSC] = useState('');
  const [accountName, setAccountName] = useState('');
  const router = useRouter();

  const VerifyBank = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ AccountNo: AcNo , IFSCcode : IFSC }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.responseData
        console.log(data)
        console.log(data.request_id)
        getBankDetails(data.request_id);
      } else {
        const error = await response.text();
        setMessage(`Verification failed: ${error}`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    }
  };
  const getBankDetails = async (id:any) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/getBank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID:id}),
      });

      if (response.ok) {
        console.log('response recieved')
        const responseData = await response.json();
        const data = responseData.responseData[0].result
        console.log(data)
        setAccountName(data.name_at_bank)
        if(data.account_exists == "YES"){
            setMessage('Verified');
        }
        else{
            setMessage('Not Verified');

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
      <h1>Bank</h1>
      <input
        type="text"
        placeholder="Enter Account number"
        value={AcNo}
        onChange={(e) => setAcNo(e.target.value)} // Update the PIN state on user input
      />
      <input
        type="text"
        placeholder="Enter IFSC code"
        value={IFSC}
        onChange={(e) => setIFSC(e.target.value)} // Update the PIN state on user input
      />
      <button onClick={VerifyBank}> Check </button>

      {message && <p>{message}</p>}

      {accountName && (
        <div>
          <h2>Address Details:</h2>
          <p><strong>AccountNAme:</strong> {accountName}</p>
        </div>
      )}
    </div>
  );
};

export default BankVerificationPage;
