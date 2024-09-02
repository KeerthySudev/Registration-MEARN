"use client";

import { useState } from "react";
import styles from "./PAN.module.css";

const PanVerificationPage = () => {
  const [message, setMessage] = useState("");
  const [pan, setPan] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handles the pan card verification by sending the PAN card number to the server

  const PanCard = async () => {
    //Validate the input
    if (!pan) {
      setMessage("PAN card number is required");
      setMessageType("error");
      return;
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      setMessage("PAN is not in valid format");
      setMessageType("error");
      return;
    }
    try {
      // Send the PAN card number to the server
      const response = await fetch("http://127.0.0.1:5000/api/users/PAN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PAN: pan }),
      });
      // Check if the response from the server is okay

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.responseData.result;
        console.log(data);
        if (data.link_status == true) {
          setMessage("PAN verified");
          setMessageType("success");
        } else {
          setMessage("Invalid PAN");
          setMessageType("error");
        }
      } else {
        const error = await response.text();
        setMessage(`Verification failed: ${error}`);
        setMessageType("error");
      }
    } catch (error: any) {
      setMessage(`An error occurred: ${error.message}`);
      setMessageType("error");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>PAN</h1>
      <input
        type="text"
        placeholder="Enter PAN number"
        value={pan}
        onChange={(e) => setPan(e.target.value)}
        className={styles.input}
      />
      <button onClick={PanCard} className={styles.button}>
        Check
      </button>

      {message && <p className={styles.message}>{message}</p>}
      {message.startsWith("PAN verified") && (
        <div className={styles.details}>
          <p>PAN card verified</p>
          <a href="/authentication/bank" className={styles.verifyButton}>
            Verify Bank Account
          </a>
        </div>
      )}
    </div>
  );
};

export default PanVerificationPage;
