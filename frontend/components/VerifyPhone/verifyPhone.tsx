"use client";

import { useEffect, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { initializeApp, getApps, getApp } from "firebase/app";
import styles from "./verifyPhone.module.css";

const firebaseConfig = {
  apiKey: "AIzaSyCxHi6XDSgZ7YLORTNIJThYnlOlp-5q6jQ",
  authDomain: "otp-verification-af263.firebaseapp.com",
  projectId: "otp-verification-af263",
  storageBucket: "otp-verification-af263.appspot.com",
  messagingSenderId: "1048068806342",
  appId: "1:1048068806342:web:4bd823f5424746c52929c7",
  measurementId: "G-P59C4GJKVS",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
  }
}

const OtpPage = () => {
  const phoneNumber = sessionStorage.getItem("phone");
  const [otp, setOtp] = useState<string>("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);
  const [messageType, setMessageType] = useState("");
  const router = useRouter();
  // const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  // Function to set up RecaptchaVerifier
  function setupRecaptchaVerifier() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA resolved");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired. Resetting...");
            window.recaptchaVerifier?.reset();
          },
        }
      );
    }
  }

  const cleanupRecaptchaVerifier = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
      console.log("reCAPTCHA verifier cleaned up.");
    }
  };

  useEffect(() => {
    setupRecaptchaVerifier();

    return () => {
      cleanupRecaptchaVerifier();
    };
  }, []);

  if (window.recaptchaVerifier) {
    console.log(
      "myVariable exists on the window object:",
      window.recaptchaVerifier
    );
  } else {
    console.log("myVariable does not exist on the window object.");
  }

  const handleSendOtp = async () => {
    setIsSendingOtp(true);

    try {
      if (!phoneNumber) {
        throw new Error("Phone number is not available.");
      }

      setupRecaptchaVerifier();

      if (!window.recaptchaVerifier) {
        throw new Error("reCAPTCHA verifier is not initialized.");
      }

      console.log("Sending OTP to:", phoneNumber);

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent successfully! Please check your number.");
      setMessageType("success");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error sending OTP:", error.message);
        setMessage(`Error sending OTP: ${error.message}`);
        setMessageType("error");
      } else {
        console.error("Unexpected error sending OTP:", error);
        setMessage("Error sending OTP: An unexpected error occurred.");
        setMessageType("error");
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setMessage("OTP is required");
      setMessageType("error");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setMessage("OTP must be a 6-digit number");
      setMessageType("error");
      return;
    }

    setMessage("");
    setIsVerifyingOtp(true);

    if (!verificationId) {
      setMessage("Verification ID not found.");
      setMessageType("error");
      setIsVerifyingOtp(false);
      console.error("Verification ID is null or undefined.");
      return;
    }

    try {
      console.log("Verifying OTP with ID:", verificationId);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      setMessage("OTP verified successfully!");
      setMessageType("success");
      router.push("/verification/emailVerify");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error verifying OTP:", error.message);
        setMessage(`Invalid OTP. Please try again. Error: ${error.message}`);
        setMessageType("error");
      } else {
        console.error("Unexpected error verifying OTP:", error);
        setMessage(
          "Invalid OTP. Please try again. An unexpected error occurred."
        );
        setMessageType("error");
      }
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>OTP Verification</h1>
      <p className={styles.title}>Verify Your Mobile Number - {phoneNumber}</p>
      <div id="recaptcha-container" className={styles.recaptchaContainer}></div>
      <button
        onClick={handleSendOtp}
        disabled={isSendingOtp}
        className={`${styles.button} ${
          isSendingOtp ? styles.disabledButton : ""
        }`}
      >
        {isSendingOtp ? "Sending OTP..." : "Send OTP"}
      </button>

      <form onSubmit={handleVerifyOtp}>
        <div className={styles.formGroup}>
          <label htmlFor="otp" className={styles.label}>
            Enter OTP:
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
            className={styles.input}
          />
        </div>
        {message && (
          <p
            className={
              messageType === "success"
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={isVerifyingOtp}
          className={`${styles.button} ${
            isVerifyingOtp ? styles.disabledButton : ""
          }`}
        >
          {isVerifyingOtp ? "Verifying OTP..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
