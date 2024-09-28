import "../../../App.css";
import React from "react";
import bgPic from "../../../assets/bg.jpg";
import Navbar from "../../../components/home/Navbar";
import Hero from "../../../components/home/Hero";
import About from "../../../components/home/About";
import Banner from "../../../components/home/Banner";
import Pricing from "../../../components/home/Pricing";
import Class from "../../../components/home/Class";
import Contact from "../../../components/home/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

const Home: React.FC = () => {
    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 700,
            easing: "ease-in",
            delay: 50,
        });
        AOS.refresh();
    }, []);
    return (
        <div>
            <div className="h-[700px] relative">
                <img src={bgPic} alt="background" className="fixed right-0 top-0 h-[700px] w-full object-cover -z-10 " />
                <Navbar />
                <Hero />
                <div className="col-md-4 md:w-full">
                    <div className="absolute bottom-0 w-full font-bold italic text-center bg-green text-black text-xl py-2 uppercase overflow-hidden">
                        <div className="whitespace-nowrap animate-marquee">
                            <span>
                                * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look
                                hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up.
                                Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick
                                ass.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* About */}
            <About />
            <Class />
            <Banner />
            <Pricing/>
            <Contact />
            
        </div>
    );
};

export default Home;
