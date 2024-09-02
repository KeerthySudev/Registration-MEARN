'use client'
import { useEffect, useState } from 'react';
const SuccessPage = () => {
  const [userDetails, setUserDetails] = useState<any>(null); // Adjust type as needed
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const storedEmail = sessionStorage.getItem('email');

  useEffect(() => {
    // Retrieve the email from session storage
    

    if (storedEmail) {
      // Fetch user details from the backend
      fetch(`http://localhost:5000/api/users/verify?email=${encodeURIComponent(storedEmail)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setUserDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          setError('An error occurred: ' + error.message);
          setLoading(false);
        });
    } else {
      setError('No email found in session storage.');
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          {userDetails ? (
            <div>
              
              <p>Hello, {userDetails.email}</p>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
              <p>Phone: {userDetails.phone}</p>
              <p>DOB: {userDetails.dob}</p>
              <p>Aadhaar: {userDetails.aadhaar}</p>
            </div>
          ) : (
            <p>No user details found.</p>
          )}
        </>
      )}
      <p>Thank you for registering!</p>
    </div>
  );
};

export default SuccessPage;
