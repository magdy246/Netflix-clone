import React from 'react'
import { Outlet } from "react-router";
import "./Layout.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';
export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
