import { useState, useEffect } from 'react';
import { fetchPest } from '@/app/utils/fetchPest';


export const useGetPestData = () => {
 const [pestData, setPestData] = useState();
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
