import "../../App.css";
import React from "react";
import { FaStar } from "react-icons/fa";
import { RiMapPinUserFill } from "react-icons/ri";
import { IoTime } from "react-icons/io5";

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, delay }) => (
    <div
        data-aos="fade-right"
        data-aos-delay={delay}
        className="flex flex-col items-start h-[350px] w-[350px] bg-transparent border-2 border-black rounded-xl p-10 group hover:bg-black transition duration-300"
    >
        <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full border-gray4 border mb-5 bg-green5 group-hover:bg-transparent">
            {icon}
        </div>
        <h1 className="font-bold italic text-2xl">{title}</h1>
        <p>{description}</p>
    </div>
);

const About: React.FC = () => (
    <div className="text-white" style={{ backgroundImage: "radial-gradient(circle, rgba(20,20,30,1) 0%, rgba(0,0,0,1) 100%)" }}>
        <span id="about"></span>
        <div className="container pt-14">
            <div className="flex flex-row justify-center space-x-6 pt-6  h-[450px] relative z-10">
                <InfoCard
                    icon={<FaStar className="w-5 h-auto text-white group-hover:text-green5" />}
                    title="Experience"
                    description="Our specialists take care of your form and they will check and talk to you if you have any questions during the execution of the exercise plans."
                    delay="100"
                />
                <InfoCard
                    icon={<RiMapPinUserFill className="w-7 h-auto text-white group-hover:text-green5" />}
                    title="Coach trainer"
                    description="Our personal trainers are available for you, you can send an inquiry at any time or call your trainer. Use the price list and choose the right plan for you."
                    delay="300"
                />
                <InfoCard
                    icon={<IoTime className="w-7 h-auto text-white group-hover:text-green5" />}
                    title="Class"
                    description="Transform your fitness with our expert-led classes. Gain strength, flexibility, and endurance using top-notch equipment and personalized guidance."
                    delay="500"
                />
            </div>
        </div>
    </div>
);

export default About;
