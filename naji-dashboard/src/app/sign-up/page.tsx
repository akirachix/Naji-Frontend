
'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userSignup } from '../utils/usersignUp';
import { FiEye, FiEyeOff} from 'react-icons/fi';

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [apiError, setApiError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: FormData) => {
    try{
      console.log('SignUp submitted', data);

      const response = await userSignup(data);

      if(response.error){
        setApiError(response.error)
      }

      else{
        setSuccessMessage("Account created successfully! Let's go to Login .....")
        setTimeout(() => router.push("/login"), 2000)
      }
    }

    catch (error){
      
      setApiError((error as Error).message)

    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex">
      <div className="w-1/2 mt-1 bg-[#f5f0e6] p-19 flex flex-col justify-center">
        <div>
          <h1 className='mt-[-20px] text-center text-4xl font-bold'>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-14 ml-[10%] space-y-14">
          <div>
            <label htmlFor="first_name" className="block mb-2">First Name</label>
            <input
              id="first_name"
              {...register('first_name')}
              className="w-[80%] py-5 border-2 pl-6  border-[#641414] rounded-[25px]"
            />
            {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2">Last Name</label>
            <input
              id="last_name"
              {...register('last_name')}
              className="w-[80%] py-5 pl-6  border-2 border-[#641414] rounded-[25px]"
            />
            {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-[80%] py-5 pl-6 border-2 border-[#641414] rounded-[25px]"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                {...register('password')}
                className="w-[80%] py-5 pr-10 pl-6 border-2 border-[#641414] rounded-[25px]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-[22%] top-1/2 transform -translate-y-1/2"
              >
                {passwordVisible ?  <FiEye /> : <FiEyeOff/>}
              </button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className={`w-44 mt-20 ml-[30%] flex justify-center bg-[#5b2a14] text-white py-5 rounded-[25px] hover:bg-[#ef5b1c]"
              ${isSubmitting ? "opacity-40 cursor-not-allowed" : ""

              }`}

              disabled = {isSubmitting}
            >
              {isSubmitting ? "Creating account...." : "Signup"}
            </button>


           {successMessage && (
              <p className="mt-2 text-green-500 text-sm ml-33">
                {successMessage}
              </p>
            )}
            {apiError && (
              <p className="mt-2 text-red-500 text-center text-sm">
                {apiError}
              </p>
            )}
          </div>
        </form>
        <p className="mt-20 text-1xl text-center ml-[-8%]">
          Already have an account?{' '}
          <a onClick={() => router.push('/login')} className="text-[#5b2a14] hover:underline text-1xl font-bold cursor-pointer">Login</a>
        </p>
      </div>
      <div className="w-1/2 h-dvh relative">
        <Image
          src="/images/Naji.jpg"
          alt="Coffee beans background"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default SignUp;


