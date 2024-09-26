"use client"; 
import { toast } from 'react-hot-toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterFarmer } from '@/app/hooks/useRegisterFarmer';
import { FarmerDetails } from '@/app/utils/types';

const FarmerRegistrationForm = () => {
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const { error, submitfarmer } = useRegisterFarmer();

  const onSubmit = async (data: FarmerDetails) => {
    await submitfarmer({
      farmer_name: data.farmer_name,
      farmer_phone_number: data.farmer_phone_number,
      farmer_county: data.farmer_county,
    });

    if (!error) {
      
      reset();
      toast.success('Successfully registered!');
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#f5f0e8]">
      <div className="w-full max-w-2xl h-[85vh] p-8 bg-[#f5f0e8] rounded-lg shadow-lg flex flex-col justify-start mt-32">
        <h2
          className="text-4xl font-bold mb-8 text-center text-[#3D0F00]"
          style={{ fontFamily: 'serif', fontSize: '2.5rem' }}
        >
          Register Farmer
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {error && <p className="text-red-600 text-sm">An error occurred</p>}

          <div className="mb-8">
            <label htmlFor="name" className="block text-lg font-medium text-[#3D0F00]" style={{ fontFamily: 'serif', fontSize: '1.25rem' }}>
              Name
            </label>
            <input
              type="text"
              {...register('farmer_name', { required: 'Name is required' })}
              placeholder="Name"
              disabled={isSubmitting}
              className="mt-2 block w-full px-6 py-6 border-2 border-[#8B4513] rounded-3xl text-[#3D0F00] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              style={{ fontFamily: 'serif', fontSize: '1.25rem' }}
            />
            {errors.farmer_name && (
              <p className="text-red-600 text-sm">
                {errors.farmer_name.message as string}
              </p>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="phoneNumber" className="block text-lg font-medium text-[#3D0F00]" style={{ fontFamily: 'serif', fontSize: '1.25rem' }}>
              Phone Number
            </label>
            <input
              type="text"
              {...register('farmer_phone_number', { required: 'Phone number is required' })}
              placeholder="Phone Number"
              disabled={isSubmitting}
              className="mt-2 block w-full px-6 py-6 border-2 border-[#8B4513] rounded-3xl text-[#3D0F00] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              style={{ fontFamily: 'serif', fontSize: '1.25rem' }}
            />
            {errors.farmer_phone_number && (
              <p className="text-red-600 text-sm">
                {errors.farmer_phone_number.message as string}
              </p>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="county" className="block text-lg font-medium text-[#3D0F00]" style={{ fontFamily: 'serif', fontSize: '1.25rem' }}>
              County
            </label>
            <input
              type="text"
              {...register('farmer_county', { required: 'County is required' })}
              placeholder="County"
              disabled={isSubmitting}
              className="mt-2 block w-full px-6 py-6 border-2 border-[#8B4513] rounded-3xl text-[#3D0F00] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              style={{ fontFamily: 'serif', fontSize: '1.25rem' }}
            />
            {errors.farmer_county && (
              <p className="text-red-600 text-sm">
                {errors.farmer_county.message as string}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-10 w-40 py-3 border border-transparent rounded-3xl shadow-sm text-lg font-medium text-white bg-[#3D0F00] hover:bg-[#6B3E0A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D0F00]"
              style={{ fontFamily: 'serif', fontSize: '1.25rem' }}
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerRegistrationForm;
