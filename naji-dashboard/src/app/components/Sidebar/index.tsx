'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();
  const navItems = [
    { name: 'dashboard', icon: 'home.png', path: '/dashboard' },
    { name: 'sales', icon: 'location.png', path: '/sales' },
    { name: 'farmer-register', icon: 'statistics.png', path: '/farmer-registration' },
    { name: 'farmer', icon: 'user.png', path: '/farmer' },
  ];

  return (
    <div className="bg-[#3D0F00] w-64 h-screen z-10 sticky top-0 flex flex-col">
      <div className="text-center mb-10">
        <Image
          src={`/images/logo.png`}
          alt={navItems[0].name}
          width={100}
          height={28}
        />
      </div>
      <nav className="flex-grow space-y-10">
        {navItems.map((item) => (
          <Link href={item.path} key={item.name}>
            <div
              className={`flex items-center gap-4 text-white py-4 my-8 hover:bg-[#5D2B16] rounded-md px-6 transition ${
                pathname === item.path ? 'bg-[#5D2B16]' : ''
              }`}
            >
              <Image
                src={`/images/${item.icon}`}
                alt={item.name}
                width={28}
                height={28}
              />
              <h2 className="text-lg font-medium capitalize">{item.name}</h2>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
