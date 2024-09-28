'use client';
import { toast } from 'react-hot-toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useRegisterFarmer } from '@/app/hooks/useRegisterFarmer';
import { FarmerDetails } from '@/app/utils/types';

const FarmerRegistrationForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const { error, submitfarmer } = useRegisterFarmer();
  const router = useRouter();

  const onSubmit = async (data: FarmerDetails) => {
    await submitfarmer({
      farmer_name: data.farmer_name,
      farmer_phone_number: data.farmer_phone_number,
      farmer_county: data.farmer_county,
    });
    if (!error) {
      reset();
      toast.success('Successfully registered!');
      router.push('/farmer');
    }
  };

  return (
    <div className="flex justify-center items-start min-h-2.5  ">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl h-auto p-4 lg:p-2 rounded-lg flex flex-col justify-start 2xl:mt-32 lg:mt-1">
        <h2
          className="text-2xl md:text-3xl lg:mt-1 xl:mt-10 lg:text-4xl font-bold mb-4 md:mb-8 text-center text-[#3D0F00]"
          style={{ fontFamily: 'serif' }}
        >
          Register Farmer
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-8">
          {error && <p className="text-red-600 text-sm">An error occurred</p>}

          <div className="mb-4 md:mb-8">
            <label htmlFor="name" className="block text-base md:text-lg lg:ml-8 font-medium text-[#3D0F00]" style={{ fontFamily: 'serif' }}>
              Name
            </label>
            <input
              type="text"
              {...register('farmer_name', { required: 'Name is required' })}
              placeholder="Name"
              disabled={isSubmitting}
              className="mt-2 block w-5/6 px-1 py-1 lg:px-6 lg:ml-8 lg:py-4 border-2 border-[#8B4513] rounded-3xl text-[#3D0F00] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              style={{ fontFamily: 'serif' }}
            />
            {errors.farmer_name && (
              <p className="text-red-600 text-sm">
                {errors.farmer_name.message as string}
              </p>
            )}
          </div>

          <div className="mb-4 md:mb-8">
            <label htmlFor="phoneNumber" className="block text-base md:text-lg lg:ml-8 font-medium text-[#3D0F00]" style={{ fontFamily: 'serif' }}>
              Phone Number
            </label>
            <input
              type="text"
              {...register('farmer_phone_number', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be exactly 10 digits'
                }
              })}
              placeholder="Phone Number"
              disabled={isSubmitting}
              className="mt-2 block w-5/6 px-4 py-4 md:px-6 lg:ml-8 lg:py-4 border-2 border-[#8B4513] rounded-3xl text-[#3D0F00] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              style={{ fontFamily: 'serif' }}
            />
            {errors.farmer_phone_number && (
              <p className="text-red-600 text-sm">
                {errors.farmer_phone_number.message as string}
              </p>
            )}
          </div>

          <div className="mb-4 md:mb-8">
            <label htmlFor="county" className="block text-base lg:ml-8 md:text-lg font-medium text-[#3D0F00]" style={{ fontFamily: 'serif' }}>
              County
            </label>
            <input
              type="text"
              {...register('farmer_county', { required: 'County is required' })}
              placeholder="County"
              disabled={isSubmitting}
              className="mt-2 block w-5/6 px-4 py-4 lg:px-6 lg:ml-8 lg:py-4 border-2 border-[#8B4513] rounded-3xl text-[#3D0F00] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              style={{ fontFamily: 'serif' }}
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
              className="mt-4 lg:mt-4 w-32 md:w-40 py-3  border border-transparent rounded-3xl shadow-sm text-base md:text-lg font-medium text-white bg-[#3D0F00] hover:bg-[#6B3E0A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D0F00]"
              style={{ fontFamily: 'serif' }}
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
