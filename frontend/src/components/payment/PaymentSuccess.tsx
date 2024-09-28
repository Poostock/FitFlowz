import React from "react";
import myImage from "../../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-cover min-h-screen flex items-center justify-center text-white" style={{ backgroundImage: `url(${myImage})` }}>
            <div className="bg-gray-900 p-12 rounded-2xl shadow-xl w-full md:w-1/2 text-center text-white">
                <h2 className="text-5xl font-bold mb-6">Payment Received</h2>
                <div className="flex justify-center mb-6">
                    <span className="text-6xl">✔</span>
                </div>
                <p className="text-2xl mb-8">
                    Thank you for your payment. We will send a receipt to your email. If you have any questions, feel free to contact us.
                </p>
                <button
                    className="bg-lime-400 text-white font-semibold py-4 px-8 text-xl rounded-2xl hover:bg-gray-200 transition duration-300 ease-in-out"
                    onClick={() => navigate("/home")}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
