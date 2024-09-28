import "../../App.css";
import React from "react";
import BannerPng from "../../assets/about.jpg";

const Banner: React.FC = () => {
    return (
        <div
            className="py-12 sm:py-0 relative"
            style={{ backgroundImage: "radial-gradient(circle, rgba(20,20,30,1) 0%, rgba(0,0,0,1) 100%)" }}
        >
            <div className="container min-h-[620px] flex items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center pt-14">
                    {/* Image Section */}
                    <div data-aos="fade-up">
                        <img src={BannerPng} alt="Banner" className="w-auto h-[480px] rounded-tr-[120px]" />
                    </div>

                    {/* Text Content Section */}
                    <div className="relative lg:pr-20">
                        <div className="relative z-10 space-y-5">
                            <h1 data-aos="fade-up" data-aos-delay="300" className="text-4xl font-semibold uppercase text-white">
                                Get in shape and training{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green2 to-green5">
                                    at the FitFlowz
                                </span>
                            </h1>
                            <p data-aos="fade-up" data-aos-delay="500" className="text-white">
                                We have been creating and implementing projects for many years all over the world, with hundreds of
                                satisfied customers.
                            </p>
                        </div>

                        {/* Background Color Blob */}
                        <div className="h-[300px] w-[300px] bg-gradient-to-r from-white to-green1 rounded-full absolute bottom-[-50px] left-[300px] blur-3xl opacity-50"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
