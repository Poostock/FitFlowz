import "../../App.css";
import React from "react";

interface InfoCardProps {
    type: string;
    price: string;
    per: string;
    description: string;
    aosDelay: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ type, price, per, description, aosDelay }) => (
    <div data-aos="flip-right" data-aos-delay={aosDelay} className="flex h-full">
        <div className="flex h-[350px] w-[350px] bg-transparent border-2 border-green3 rounded-xl flex-col pl-7 pt-10 group hover:bg-gradient-to-r from-green3 to-green5 hover:border-none hover:text-black transition-transform duration-300 transform hover:scale-110">
            <h1 className="flex justify-center items-center mb-6 text-lg bg-green5 bg-opacity-40 w-[90px] h-auto rounded-full">{type}</h1>
            <div className="flex space-x-1">
                <h1 className="font-bold text-3xl">฿ {price}</h1>
                <h1 className="text-lg font-medium">/{per}</h1>
            </div>
            <p className="pr-4 font-medium">{description}</p>
        </div>
    </div>
);

const Pricing: React.FC = () => (
    <div className="text-white h-[550px]" style={{ backgroundImage: "radial-gradient(circle, rgba(20,20,30,1) 0%, rgba(0,0,0,1) 100%)" }}>
        <span id="pricing"></span>
        <div className="pt-14">
            <div className="relative z-10 flex pt-6 space-x-6 justify-center">
                <InfoCard
                    type="Daily"
                    price="49"
                    per="d."
                    description="Members can access all services within the fitness center for a full day."
                    aosDelay="100"
                />
                <InfoCard
                    type="Monthly"
                    price="499"
                    per="M."
                    description="Members can access all services within the fitness center an unlimited number of times for one month."
                    aosDelay="300"
                />
                <InfoCard
                    type="Yearly"
                    price="1999"
                    per="yr."
                    description="Members can access all services within the fitness center an unlimited number of times for a full year."
                    aosDelay="500"
                />
            </div>
        </div>
    </div>
);

export default Pricing;
