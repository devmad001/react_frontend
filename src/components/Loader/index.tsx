import React, { FC, useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className="text-center">
        <CircularProgress size={200} color="error" />
      </div>
    </div>
  );
};

export default Loader;
