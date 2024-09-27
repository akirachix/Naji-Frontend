'use client';

import Image from 'next/image';
import React, { useState} from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userlogin from "../utils/userlogin";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { setCookie } from 'cookies-next'; 


const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

 

  const onSubmit = async (data: FormData) => {
    console.log('Login submitted', data);
    const response = await userlogin(data);
    
    if (response) {
      const { token} = response;
      setCookie('authToken', token, { maxAge: 60 * 60 * 24 * 365, path: '/' });
      setSuccessMessage("Logged in successfully! Let's go to your page .....");

      setTimeout(() => {
        router.push('/dashboard'); 
      }, 2000);
    } else {
      setApiError("Login failed. Please try again."); 
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-[#f5f0e6] p-8 flex items-center justify-center">
        <div className="w-full ml-20">
          <h2 className="text-3xl mt-[-20px] font-extrabold mb-6 text-center">Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-20">
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="text"
                id="email"
                {...register('email')}
                className="w-[80%] py-5 pl-6 border-2 border-[#641414] rounded-[25px]"
              />
              {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  {...register('password')}
                  className="w-[80%] py-5 pr-10 pl-6 border-2 border-[#641414] rounded-[25px]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[22%] top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className={`w-44 mt-20 ml-[28%] flex justify-center bg-[#5b2a14] text-white py-5 rounded-[25px] hover:bg-[#ef5b1c] ${isSubmitting ? "opacity-40 cursor-not-allowed" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging you In...." : "Login"}
            </button>

            {successMessage && (
              <p className="mt-2 text-green-500 text-sm ml-48">{successMessage}</p>
            )}
            {apiError && (
              <p className="mt-2 text-red-500 text-center text-sm">{apiError}</p>
            )}
          </form>
          <div className="mt-8 text-1xl ml-80">
            <span className="text-1xl">OR</span>
          </div>
          <button
            className="mt-4 w-80 py-5 ml-40 border-2 border-[#641414] rounded-[25px] flex items-center justify-center space-x-2 hover:bg-gray-50"
          >
            <Image src="/images/google.png" alt="Google logo" width={20} height={20} />
            <span className='w-[-80%] rounded-[25px]'>Continue with Google</span>
          </button>
          <p className="mt-16 ml-48 text-1xl">
            Don&#39;t have an account?{' '}
            <a onClick={() => router.push('/signup')} className="text-[#6b1d1d] hover:underline cursor-pointer">
              Sign Up
            </a>
          </p>
        </div>
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
}

export default Login;
