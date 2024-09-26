'use client';

import React from 'react';
import { useGetPestIncident } from '../Components/hooks/useGetPestincident';
import PestInfestationChart from '../Components/Linearchart';
import Layout from '../Components/Layout';


export interface Pestincident {
   incident_id: number;
   detection_date: string;
   confidence_score: number;
   affected_area_percentage: number;
}
const Dashboard = () => {
   const { pestIncidentData: pests, loading, error } = useGetPestIncident();
   if (loading) {
       return <div className="text-center text-1g">Loading...</div>;
      
   }
   if (error) {
      
       return <div className="text-center text-lg text-red-500">Error: {error}</div>;
   }
   const totalPests = pests?.length || 0;
   const totalPestInfestation = pests?.reduce((total, pest) => total + pest.affected_area_percentage, 0) || 0;
   return (
    <Layout>
       <div className="flex flex-col p-10 bg-gray-100" >
           <div className="flex items-center justify-evenly mb-20 px-4">
               <div className="p-2 bg-brown-600">
                   <div className="shadow-lg border-2 border-brown-600 w-[250px] h-[110px] rounded-lg p-4 flex flex-col items-center bg-white border-gray-500">
                       <p className="text-lg font-semibold text-black">Total Pests</p>
                       <h3 className="text-2xl font-bold text-black ">{totalPests}</h3>
                   </div>
               </div>
               <div className="shadow-lg border-2 border-brown-600 w-[250px] h-[110px] rounded-lg p-4 flex flex-col items-center  border-green-600 mr-50">
                   <p className="text-lg font-semibold text-black">Total Infestation</p>
                   <div className="p-2 bg-brown-600">
                   </div>
                   <h3 className="text-2xl font-bold text-black">{totalPestInfestation}</h3>
               </div>
           </div>
           <div className="mt-10">
               <PestInfestationChart />
           </div>
       </div>
       </Layout>
   );
};


export default Dashboard;
