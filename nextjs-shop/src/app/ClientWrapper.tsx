// src/app/ClientWrapper.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    // Simulate a delay of 0.8 seconds
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return showSpinner ? <Spinner /> : <>{children}</>;
};

export default ClientWrapper;
