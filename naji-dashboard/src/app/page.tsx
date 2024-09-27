
import Dashboard from "./dashboard/page";

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

const MainPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('authToken');
    if (token) {
      
      router.push('/dashboard'); 
    } else {
      
      router.push('/login');
    }
  }, [router]);

  return null
    
};

export default MainPage;



