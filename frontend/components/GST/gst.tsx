"use client";

import { useState } from "react";
import styles from "./GST.module.css";

const GstVerificationPage = () => {
  const [message, setMessage] = useState("");
  const [GST, setGST] = useState("");

  // Handles the GST verification by sending the GST number to the server

  const VerifyGST = async () => {
    //Validate the input
    if (!GST) {
      setMessage("GST number is required");
      return;
    }

    if (!/^[A-Z\d]{15}$/.test(GST)) {
      setMessage("GST number is not in valid format");
      return;
    }

    try {
      // Send the GST number to the server
      const response = await fetch("http://127.0.0.1:5000/api/users/GST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ GST: GST }),
      });
      // Check if the response from the server is okay

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.responseData.result.source_output;
        console.log(data);
        if (data.gstin_status == "Active") {
          setMessage("GST number verified");
        } else {
          setMessage("Invalid GST number ");
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
      <h1 className={styles.header}>GST</h1>
      <input
        type="text"
        placeholder="Enter GST number"
        value={GST}
        onChange={(e) => setGST(e.target.value)}
        className={styles.input} // Update the PIN state on user input
      />
      <button onClick={VerifyGST} className={styles.button}>
        Check
      </button>

      {message && <p className={styles.message}>{message}</p>}
      {message.startsWith("GST number verified") && (
        <div className={styles.details}>
          <p>GST number verified</p>
          <a href="/success" className={styles.verifyButton}>
            Complete verification
          </a>
        </div>
      )}
    </div>
  );
};

export default GstVerificationPage;
