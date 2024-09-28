import "../../App.css";
import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => (
    <div className="h-full text-white relative z-30">
        <div className="h-full flex justify-center items-center p-4 w-full">
            <div className="container flex justify-center w-1/2">
                <div className="space-y-4 text-center">
                    <h1 className="text-5xl font-bold italic">WORK WITH</h1>
                    <h1 className="text-5xl font-bold italic">PROFESSIONALS</h1>
                    <p>
                        FitFlowz offers diverse fitness classes for all levels, with full equipment and expert trainers. Achieve your
                        fitness goals with us, join today!
                    </p>
                    <Link to="/register">
                        <button className="mt-4 text-black px-5 py-3 bg-green rounded-full shadow-[0_0_15px_4px_rgba(201,254,84,0.7)] transition hover:shadow-none">
                            Start Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default Hero;
