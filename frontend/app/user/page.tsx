'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UserPage.module.css';

const UserPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
   // Get email from query parameter

   useEffect(() => {
    if (!router.isReady) return; // Wait for the router to be ready
  
    const email = router.query.email;
  
    if (!email) {
      console.error('Email not found in query parameters.');
      setError('Email is missing.');
      setLoading(false);
      return;
    }
  
    const fetchUserData = async () => {
      try {
        console.log(`Fetching data for email: ${email}`);
        const response = await fetch(`http://localhost:5000/api/users?email=${encodeURIComponent(email)}`);
        
        console.log(`Response status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched user data:', data);
          setUser(data);
        } else {
          setError('Failed to fetch user data.');
          console.error('Response error:', await response.text());
        }
      } catch (error) {
        setError('An error occurred while fetching user data.');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [router.isReady, router.query]);

  if (loading) return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.message}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Details</h1>
      {user ? (
        <div className={styles.details}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Aadhaar Number:</strong> {user.aadhaar}</p>
        </div>
      ) : (
        <p className={styles.message}>No user data available.</p>
      )}
    </div>
  );
};

export default UserPage;
