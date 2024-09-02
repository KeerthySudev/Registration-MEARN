"use client";

import { useState } from "react";
import styles from "./bank.module.css";

const BankVerificationPage = () => {
  const [message, setMessage] = useState("");
  const [AcNo, setAcNo] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [accountName, setAccountName] = useState("");

  // Handles the bank account verification by sending the account number and pin code to the server

  const VerifyBank = async () => {
    //Validate the input
    if (!AcNo) {
      setMessage("Account number is required");
      return;
    }
    if (!IFSC) {
      setMessage("IFSC code is required");
      return;
    }

    if (!/^\d{14}$/.test(AcNo)) {
      setMessage("Enter a valid account number");
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(IFSC)) {
      setMessage("Invalid IFSC code.");
      return;
    }

    try {
      // Send the account number and pin code to the server
      const response = await fetch("http://127.0.0.1:5000/api/users/bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ AccountNo: AcNo, IFSCcode: IFSC }),
      });
      // Check if the response from the server is okay

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.responseData;
        console.log(data);
        console.log(data.request_id);
        getBankDetails(data.request_id);
      } else {
        const error = await response.text();
        setMessage(`Verification failed: ${error}`);
      }
    } catch (error: any) {
      setMessage(`An error occurred: ${error.message}`);
    }
  };
  const getBankDetails = async (id: any) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/getBank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID: id }),
      });

      if (response.ok) {
        console.log("response recieved");
        const responseData = await response.json();
        const data = responseData.responseData[0].result;
        console.log(data);
        setAccountName(data.name_at_bank);
        if (data.account_exists == "YES") {
          setMessage("Verified");
        } else {
          setMessage("Not Verified");
        }
      } else {
        const error = await response.text();
        setMessage(`Verification failed: ${error}`);
      }
    } catch (error: any) {
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Bank</h1>
      <input
        type="text"
        placeholder="Enter Account number"
        value={AcNo}
        onChange={(e) => setAcNo(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Enter IFSC code"
        value={IFSC}
        onChange={(e) => setIFSC(e.target.value)}
        className={styles.input}
      />
      <button onClick={VerifyBank} className={styles.button}>
        {" "}
        Check{" "}
      </button>

      {message && <p className={styles.message}>{message}</p>}

      {accountName && (
        <div className={styles.details}>
          <h2>Account Details:</h2>
          <p>
            <strong>AccountNAme:</strong> {accountName}
          </p>
          <a href="/authentication/GST" className={styles.verifyButton}>
            Verify GST number
          </a>
        </div>
      )}
    </div>
  );
};

export default BankVerificationPage;
