
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', icon: 'home.png', path: '/' },
        { name: 'Location', icon: 'location.png', path: '/location' },
        { name: 'Statistics', icon: 'statistics.png', path: '/statistics' },
        { name: 'Farmers', icon: 'user.png', path: '/farmers' },
    ];

    return (
        <div className="bg-[#3D0F00] w-64 h-screen z-10 ml-0">
            <div className="text-center mb-10">
                <img src="/images/logo.png" alt="Logo" className="w-24 mx-auto ml-2 "/>
            </div>
            <nav className="space-y-10 ">
                {navItems.map((item) => (
                    <Link href={item.path} key={item.name}>
                        <div className={`flex items-center gap-4 text-white py-4 my-8 hover:bg-[#5D2B16] rounded-md px-6 transition ${pathname === item.path ? 'bg-[#5D2B16]' : ''}`}>
                            <img src={`/images/${item.icon}`} alt={item.name} className="w-7 h-7" />
                            <h2 className="text-lg font-medium">{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;