import { useState, useEffect } from 'react';
import { fetchPest } from '@/app/utils/fetchPest';
import { fetchPestincident } from '@/app/utils/fetchPestincident';
import { PestIncident } from '@/app/utils/types';

export const useGetPestData = () => {
 const [pestData, setPestData] = useState(<PestIncident>);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);


 useEffect(() => {
   const getPestData = async () => {
     try {
       const data = await fetchPest();
       setPestData(data);
     } catch (error) {
       setError((error as Error).message);
     } finally {
       setLoading(false);
     }
   };


   getPestData();
 }, []);


 return { pestData, loading, error };
};
