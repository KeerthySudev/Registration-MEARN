"use client";
import { useState } from "react";
import styles from "./RegistrationForm.module.css";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    aadhaar: "",
  });
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  // Handle changes in the form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Validate inputs
  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name || !/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters and spaces";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone || !/^\+91\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid phone number with code(+91) is required";
    const today = new Date();
    const birthDate = new Date(formData.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (!formData.dob || age < 18) {
      newErrors.dob = "You must be at least 18 years old";
    }
    if (!formData.aadhaar || !/^\d{12}$/.test(formData.aadhaar))
      newErrors.aadhaar = "Valid Aadhaar number is required";
    return newErrors;
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      // Send the form data to the backend
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Get the response from the server
      const result = await response.json();
      if (response.ok) {
        alert("User registered successfully");
        setFormData({
          name: "",
          email: "",
          phone: "",
          dob: "",
          aadhaar: "",
        });
        setErrors({});
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("phone", formData.phone);

        // Redirect to the mobile verification page
        router.push("/verification/mobileVerify");
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <p className={styles.errorText}>{errors.dob}</p>}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Aadhaar Number:
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
            />
            {errors.aadhaar && (
              <p className={styles.errorText}>{errors.aadhaar}</p>
            )}
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
