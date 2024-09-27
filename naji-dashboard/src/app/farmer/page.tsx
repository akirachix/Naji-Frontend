'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useFarmers } from '../hooks/useFetchFarmers';
import DashboardLayout from '../components/Layout';

const FarmersDetails = () => {
  const { farmers, loading, error } = useFarmers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const farmersPerPage = 10;

  if (loading) {
    return <div className="p-40 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-40 text-center text-red-500">Error: {error}</div>;
  }

  const uniqueFarmersMap = new Map();
  farmers.forEach(FarmersDetails => {
    const key = FarmersDetails.farmer_name; 
    if (!uniqueFarmersMap.has(key)) {
      uniqueFarmersMap.set(key, FarmersDetails);
    }
  });
  const uniqueFarmers = Array.from(uniqueFarmersMap.values());

  const filteredFarmers = uniqueFarmers.filter(farmerItem =>
    farmerItem.farmer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmerItem.farmer_phone_number?.includes(searchTerm) ||
    farmerItem.farmer_county?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFarmers.length / farmersPerPage);
  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  const currentFarmers = filteredFarmers.slice(indexOfFirstFarmer, indexOfLastFarmer);

  return (
    <DashboardLayout>
      <div className="pl-24 bg-gray-100 font-sans "> 
        <h1 className="mr-40 text-3xl font-bold text-center mb-6 text-[#124502]">Farmers Details</h1>
        <div className="bg-white rounded-lg w-4/4 mx-auto">
          <div className="mr-60 p-4">
            <div className="mr-40 relative w-full text-center">
              <div className="flex items-center p-2 border border-[#3D0F00] rounded-xl mb-4 w-4/5 mx-auto">
                <Search className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-grow outline-none p-2" 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>
          <table className="w-full divide-y font-bold">
            <thead className="bg-gray-50 border-none"> 
              <tr>
                <th className="px-7 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#124502]">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#124502]">Phone number</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#124502]">Location</th>
              </tr>
            </thead>
            <tbody className="text-black divide-y">
              {currentFarmers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-[#124502]">Search Not Found</td>
                </tr>
              ) : (
                currentFarmers.map((farmerItem, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{farmerItem.farmer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{farmerItem.farmer_phone_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{farmerItem.farmer_county}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className=" mr-40 flex justify-center items-center mt-6 ">
            <button 
              aria-label="Previous page"
              className="mx-1 w-8 h-8 flex items-center justify-center rounded-full border border-[#3D0F00]"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                aria-label={`Go to page ${index + 1}`}
                className={`mx-1  w-10 h-10 flex items-center justify-center rounded-full ${currentPage === index + 1 ? 'bg-green-900 text-white' : 'border border-[#3D0F00] font-bold'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              aria-label="Next page"
              className="mx-1 w-8 h-8 flex items-center justify-center rounded-full border border-[#3D0F00]"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FarmersDetails;
