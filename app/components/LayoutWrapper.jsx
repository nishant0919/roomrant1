"use client";

import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import Footer from "./home/Footer";
import React from "react";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");

    return (
        <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Navbar />}
            <main className="flex-grow">{children}</main>
            {!isAdminRoute && <Footer />}
        </div>
    );
}