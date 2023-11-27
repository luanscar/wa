'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const NextProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
       {children}
      <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
    </>
  );
};

export default NextProgressBar;