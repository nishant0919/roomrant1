'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDoorOpen, FaUsers, FaShoppingCart } from 'react-icons/fa'; // Added FaShoppingCart for Orders
import { CgLogOut } from 'react-icons/cg';
import { Menu, X } from 'lucide-react'; // Icons for mobile menu toggle

// Define a consistent style for navigation links
const navLinkClass = (isActive) =>
  `relative flex items-center p-4 rounded-xl space-x-4 transition-all duration-300 ease-in-out
   ${isActive ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`;

// Animation variants for the desktop sidebar
const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: '0%', transition: { duration: 0.5, ease: 'easeInOut' } },
};

// Animation variants for the mobile overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

// Animation variants for the mobile menu itself
const mobileMenuVariants = {
  hidden: { x: '100%' },
  visible: { x: '0%', transition: { type: 'spring', stiffness: 100, damping: 20 } },
};

function Sidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl: '/' });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const navItems = [
        {
            name: 'Rooms',
            path: '/admin/room',
            icon: FaDoorOpen,
        },
        {
            name: 'Users',
            path: '/admin/users',
            icon: FaUsers,
        },
        {
            name: 'Orders',
            path: '/admin/orders',
            icon: FaShoppingCart,
        },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.div
                className="hidden md:flex flex-col h-screen w-64 p-6 bg-slate-900 text-white border-r border-slate-700 shadow-2xl z-50"
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
            >
                <div className="mb-10 text-center">
                    <Link href="/admin">
                        <h1 className="text-4xl font-extrabold text-indigo-400 tracking-wide cursor-pointer">
                            QuickRoom
                        </h1>
                    </Link>
                </div>

                <nav className="flex-1">
                    <ul className="space-y-4">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.path}
                                    className={navLinkClass(pathname === item.path)}
                                >
                                    <item.icon className="w-6 h-6" />
                                    <span className="text-lg font-medium">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center p-4 rounded-xl space-x-4 text-red-400 hover:bg-red-900/40 transition-colors"
                    >
                        <CgLogOut className="w-6 h-6" />
                        <span className="text-lg font-medium">Log Out</span>
                    </button>
                </div>
            </motion.div>

            {/* Mobile Sidebar & Toggle Button */}
            <div className="md:hidden">
                {/* Floating Toggle Button */}
                <button
                    className="fixed bottom-6 right-6 z-[60] p-4 bg-indigo-600 rounded-full shadow-lg text-white transition-transform hover:scale-110 active:scale-95"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Mobile Sidebar */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black/50 z-50"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={overlayVariants}
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                            <motion.div
                                className="fixed top-0 right-0 h-full w-64 bg-slate-900 p-6 text-white z-[60] flex flex-col shadow-2xl"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={mobileMenuVariants}
                            >
                                <div className="flex justify-between items-center mb-10">
                                    <h1 className="text-2xl font-bold text-indigo-400">QuickRoom</h1>
                                    <button onClick={() => setIsMobileMenuOpen(false)}>
                                        <X className="w-6 h-6 text-slate-300 hover:text-white transition-colors" />
                                    </button>
                                </div>
                                <nav className="flex-1">
                                    <ul className="space-y-4">
                                        {navItems.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.path}
                                                    className={navLinkClass(pathname === item.path)}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <item.icon className="w-6 h-6" />
                                                    <span className="text-lg font-medium">{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                <div className="mt-auto pt-6 border-t border-slate-700">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center p-4 rounded-xl space-x-4 text-red-400 hover:bg-red-900/40 transition-colors"
                                    >
                                        <CgLogOut className="w-6 h-6" />
                                        <span className="text-lg font-medium">Log Out</span>
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default Sidebar;
