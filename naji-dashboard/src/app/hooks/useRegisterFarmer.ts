"use client"; 
import { useState } from 'react';
import { registerFarmer } from '../utils/registerFarmer';
import { FarmerDetails } from '../utils/types';
export const useRegisterFarmer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const submitfarmer = async (farmerData: FarmerDetails) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await registerFarmer(farmerData);
      console.log('Submission successful:', result);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  return { submitfarmer, isSubmitting, error };
};