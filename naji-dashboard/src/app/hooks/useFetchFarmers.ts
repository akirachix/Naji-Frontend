'use client'
import { useState, useEffect } from 'react';
import { fetchFarmers } from '../utils/fetchFarmers';
import { FarmerDetails } from '../utils/types';
export function useFarmers() {
  const [farmers, setFarmers] = useState<FarmerDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadFarmers = async () => {
      try {
        const data = await fetchFarmers();
        setFarmers(data);
      } catch (err) {
        console.error('Error fetching farmers:', err);
        setError('Failed to load farmers data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadFarmers();
  }, []);
  return { farmers, loading, error };
}



