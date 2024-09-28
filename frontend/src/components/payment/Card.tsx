import React from "react";
import "../../App.css";

const Card: React.FC<{
    name: string;
    price: string;
    duration: string;
    description: string;
    // aosDelay: string;
    onPurchase: () => void; // Add onPurchase prop
}> = ({ name, price, duration, description, onPurchase }) => {
    return (
        <div
            // data-aos="fade-up"
            // data-aos-delay={aosDelay}
            className="bg-gray-800 p-12 rounded-2xl shadow-lg text-center w-full flex flex-col justify-between z-10" // Updated z-index
        >
            <h2 className="text-2xl font-semibold mb-4">{name}</h2>
            <p className="text-3xl font-bold mb-4">{price} ฿</p>
            <p className="text-xl mb-5">{description}</p>
            <p className="font-semibold text-lg mb-5">Duration: {duration}</p>
            <button
                className="bg-lime-400 text-gray-900 font-semibold py-4 px-6 text-2xl rounded-2xl hover:bg-lime-300"
                onClick={onPurchase}
            >
                Purchase Now
            </button>
        </div>
    );
};

export default Card;
