import React from 'react'
import "./NotFound.css"
import { Link } from 'react-router-dom';
export default function NotFound() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
                {/* 404 Text */}
                <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>

                {/* Subtitle */}
                <p className="text-2xl mb-4">Lost in the Stream?</p>

                {/* Description */}
                <p className="text-lg mb-8 text-gray-300 text-center px-6">
                    The page you’re looking for isn’t here. It might’ve been removed, renamed,
                    or is just hiding in the binge-watching abyss.
                </p>

                {/* Button to go back to Home */}
                <Link to="/">
                    <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition duration-200">
                        Go Back to Home
                    </button>
                </Link>
            </div>
        </>
    )
}
