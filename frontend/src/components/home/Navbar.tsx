import "../../App.css";
import React from "react";
import { IoIosFitness } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <div className="fixed top-0 right-0 w-full z-50 bg-black/30 backdrop-blur-sm py-4 sm:py-1">
            <div className="container flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center gap-4 font-bold italic text-3xl text-white">
                    <IoIosFitness className="w-10" />
                    <span>FitFlowz</span>
                </div>

                {/* Navigation Links */}
                <ul className="flex items-center gap-6 text-xl text-white py-4">
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/#about">About</a>
                    </li>
                    <li>
                        <a href="/#pricing">Pricing</a>
                    </li>
                    <li>
                        <a href="/#contact">Contact Us</a>
                    </li>
                </ul>

                {/* Sign Up and Login Buttons */}
                <div className="flex items-center gap-4">
                    <Link to="/register">
                        <button className="px-5 py-3 font-medium text-white bg-transparent rounded-full hover:bg-green3 hover:text-black shadow-md hover:shadow-lg">
                            Sign up
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="px-5 py-3 font-medium text-black bg-green rounded-full hover:bg-transparent hover:text-white shadow-md hover:shadow-lg">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
