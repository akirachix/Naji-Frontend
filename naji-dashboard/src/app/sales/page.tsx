"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFarmers } from '../hooks/useFetchFarmers';
import DashboardLayout from '../components/Layout';
import { FarmerDetails } from '../utils/types';

type SalesData = {
  [region: string]: number;
};
type RegionData = {
  region: string;
  count: number;
};
const SalesDashboard = () => {
  const { farmers, loading, error } = useFarmers();
  const [salesData, setSalesData] = useState<SalesData>({});
  useEffect(() => {
    if (farmers) {
      const uniqueFarmersMap = new Map<string, FarmerDetails>();
      const regionCounts: SalesData = {};
      farmers.forEach((farmerItem: FarmerDetails) => {
        const key = farmerItem.farmer_phone_number;
        if (key && !uniqueFarmersMap.has(key)) {
          uniqueFarmersMap.set(key, farmerItem);
          const county = farmerItem.farmer_county || 'Unknown';
          regionCounts[county] = (regionCounts[county] || 0) + 1;
        }
      });
      setSalesData(regionCounts);
    }
  }, [farmers]);
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  const sortedRegions: RegionData[] = Object.entries(salesData)
    .sort(([, a], [, b]) => b - a)
    .map(([region, count]) => ({ region, count }));
  const highestSalesRegion = sortedRegions[0] || { region: 'N/A', count: 0 };
  const lowestSalesRegion = sortedRegions[sortedRegions.length - 1] || { region: 'N/A', count: 0 };
  const chartData = sortedRegions.map(({ region, count }) => ({
    region,
    "Farmers": count
  }));
  return (
    <DashboardLayout>
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Farmer Participation Dashboard</h1>
      <div className="flex justify-between mb-6 w-[75%] mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-md w-[48%]">
          <h2 className="text-lg font-semibold text-center mb-2">Highest Participation Region</h2>
          <p className="text-2xl font-bold text-center">{highestSalesRegion.region}</p>
          <p className="text-center">Farmers: {highestSalesRegion.count}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-[48%]">
          <h2 className="text-lg font-semibold text-center mb-2">Lowest Participation Region</h2>
          <p className="text-2xl font-bold text-center">{lowestSalesRegion.region}</p>
          <p className="text-center">Farmers: {lowestSalesRegion.count}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md w-[75%] mx-auto">
        <h2 className="text-xl font-semibold mb-4">Farmers by Region</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Farmers" fill="#124502" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 w-[75%] mx-auto">
        <h2 className="text-xl font-semibold mb-4">Region Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedRegions.map(({ region, count }) => (
            <div key={region} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-semibold">{region}</p>
              <p>Farmers: {count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};
export default SalesDashboard;

// useEffect(() => {
//     if (farmers) {
//       const uniqueFarmersMap = new Map<string, FarmerDetails>();
//       const regionCounts: SalesData = {};
//       farmers.forEach((farmerItem: FarmerDetails) => {
//         const key = farmerItem.farmer_phone_number;
//         // Rest of your logic
//       });
//     }
//   }, [farmers]);
  