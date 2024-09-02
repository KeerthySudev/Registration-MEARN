

import React from 'react';
import styles from './success.module.css';

const SuccessPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Success!</h1>
      <p className={styles.message}>Verification completed successfully.</p>
    </div>
  );
};

export default SuccessPage;
