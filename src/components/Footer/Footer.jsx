import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import logo from "../../assets/logo.png"
export default function Footer() {
    return (
        <>
            <footer className="bg-gradient-to-b from-gray-800 to-black text-gray-400 py-10">
                <div className="container mx-auto px-6">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="Logo" className="h-12 w-auto" />
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <a href="#" className="flex items-center justify-center w-10 h-10 hover:shadow-2xl hover:shadow-white rounded-3xl text-black hover:text-white transition duration-300 transform hover:bg-blue-900">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-10 h-10 hover:shadow-2xl hover:shadow-white rounded-3xl text-black hover:text-white transition duration-300 transform hover:bg-black">
                            <FontAwesomeIcon icon={faXTwitter} size="lg" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-10 h-10 hover:shadow-2xl hover:shadow-white rounded-3xl text-black hover:text-white transition duration-300 transform hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-10 h-10 hover:shadow-2xl hover:shadow-white rounded-3xl text-black hover:text-white transition duration-300 transform hover:bg-red-700">
                            <FontAwesomeIcon icon={faYoutube} size="lg" />
                        </a>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center text-sm space-x-4 md:space-x-8 mb-8">
                        <a href="#" className="hover:text-white transition duration-300">FAQ</a>
                        <a href="#" className="hover:text-white transition duration-300">Help Center</a>
                        <a href="#" className="hover:text-white transition duration-300">Account</a>
                        <a href="#" className="hover:text-white transition duration-300">Media Center</a>
                        <a href="#" className="hover:text-white transition duration-300">Investor Relations</a>
                        <a href="#" className="hover:text-white transition duration-300">Jobs</a>
                        <a href="#" className="hover:text-white transition duration-300">Terms of Use</a>
                        <a href="#" className="hover:text-white transition duration-300">Privacy</a>
                        <a href="#" className="hover:text-white transition duration-300">Cookie Preferences</a>
                        <a href="#" className="hover:text-white transition duration-300">Corporate Information</a>
                    </div>

                    {/* Language Selector */}
                    {/* <div className="flex justify-center mb-8">
            <select className="bg-gray-700 text-gray-400 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
            </select>
        </div> */}

                    {/* Copyright Notice */}
                    <p className="text-center text-xs text-gray-500">
                        © 2024 Netflix Clone, Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    )
}
