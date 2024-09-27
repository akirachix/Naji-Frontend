import { useState, useEffect } from 'react';
import { fetchPestincident } from '@/app/utils/fetchPestincident';
import { PestIncident } from '@/app/utils/types';


export const useGetPestIncident = () => {
 const [pestIncidentData, setPestIncidentData] = useState<PestIncident[]>();
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>();


 useEffect(() => {
   const getPestIncidentData = async () => {
     try {
       const data = await fetchPestincident();
       setPestIncidentData(data);
     } catch (error) {
       setError((error as Error).message);
     } finally {
       setLoading(false);
     }
   };


   getPestIncidentData();
 }, []);


 return { pestIncidentData, loading, error };
};
