'use client'
import { useState } from 'react';
import styles from './RegistrationForm.module.css';
// import { useNavigate } from 'react-router-dom';

import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    aadhaar: ''
  });
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  // Handle changes in the form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone || !/^\+91\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required';    
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.aadhaar || !/^\d{12}$/.test(formData.aadhaar)) newErrors.aadhaar = 'Valid Aadhaar number is required';
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
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Get the response from the server
      const result = await response.json();
      if (response.ok) {
        alert('User registered successfully');
        setFormData({
          name: '',
          email: '',
          phone: '',
          dob: '',
          aadhaar: '',
        });
        setErrors({});
        sessionStorage.setItem('email', formData.email);
        sessionStorage.setItem('phone', formData.phone);
        router.push('/verification/mobileVerify');
      } else {
        alert(result.error); // Display server-side error message
      }
    } catch (error) {
      alert('Something went wrong'); // Handle network or other errors
    }
    
  };

  return (
    <div className={styles.formContainer}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p>{errors.name}</p>}
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p>{errors.email}</p>}
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p>{errors.phone}</p>}
          </label>
        </div>
        <div>
          <label>
            Date of Birth:
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <p>{errors.dob}</p>}
          </label>
        </div>
        <div>
          <label>
            Aadhaar Number:
            <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
            {errors.aadhaar && <p>{errors.aadhaar}</p>}
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <a href='/verification/emailVerify'>Email</a>
      <a href='/verification/mobileVerify'>Mobile</a>
      <a href='/authentication/aadhar'>AADHAR</a>
      <a href='/authentication/PanCard'>Pancard</a>
      <a href='/authentication/GST'>GST</a>
      <a href='/authentication/bank'>Bank</a>
      <a href='/address'>Address</a>
    </div>
  );
};

export default RegistrationForm;












        
    




