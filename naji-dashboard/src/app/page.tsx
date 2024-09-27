

// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { getCookie } from 'cookies-next';

// const MainPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const token = getCookie('authToken');
//     if (token) {
//       router.push('/dashboard'); 
//     }
//   }, [router]);

 
// };

// export default MainPage;

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
      router.push('/login')
    }
  }, [router]);

 return <p>Loading ...</p>
};

export default MainPage;




