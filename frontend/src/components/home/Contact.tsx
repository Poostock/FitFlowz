import React from "react";
import "../../App.css";
import { IoIosFitness } from "react-icons/io";

const Contact: React.FC = () => {
    return (
        <div
            className="h-[300px] flex justify-center"
            style={{ backgroundImage: "radial-gradient(circle, rgba(20,20,30,1) 0%, rgba(0,0,0,1) 100%)" }}
        >
            <span id="contact"></span>
            <div>
                {/* Line */}
                <div className="flex flex-col justify-center text-white/90">
                    <div className="border-t-2 border-b-2 border-green2 w-[1400px] min-h-[60px] flex justify-center">
                        <div data-aos="zoom-in" data-aos-delay="100" className="grid grid-cols-3 w-full ">
                            {/* Left */}
                            <div className="flex flex-col items-center justify-start">
                                <IoIosFitness className="h-auto w-36" />
                                <h1 className="font-bold italic text-[42px]">FITFLOWZ</h1>
                            </div>
                            {/* Right */}
                            <ul className="flex flex-col text-[24px] items-center justify-center space-y-4">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/#about">About</a>
                                </li>
                                <li>
                                    <a href="/#pricing">Pricing</a>
                                </li>
                            </ul>
                            <div className="flex flex-col items-center justify-center ">
                                <h1 className="font-bold italic text-[20px]">System Analysis and Design</h1>
                                <h1 className="text-[20px]">SEC2 GROUP18</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
