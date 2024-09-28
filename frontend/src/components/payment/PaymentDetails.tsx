import React from "react";

// Adjust the property names to match the structure of selectedPackage
interface PackageDetailsProps {
    packageInfo: {
        PackageName: string;  // Adjust property names
        Price: string;
        Description: string;
    };
    onPaymentClick: () => void;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ packageInfo, onPaymentClick }) => {
    return (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg flex-1 flex flex-col justify-between items-center text-center">
            <div>
                <h2 className="text-3xl font-bold mb-6 text-white">{packageInfo?.PackageName || "No Package Name Available"}</h2>
                <p className="text-4xl font-extrabold mb-6 text-white">{packageInfo?.Price != null ? `${packageInfo.Price} ฿` : "No Price Available"}</p>
                <p className="text-xl text-white leading-relaxed">{packageInfo?.Description || "No Description Available"}</p>
            </div>

            <div className="mt-12">
                <button
                    onClick={onPaymentClick}
                    className="bg-lime-400 text-gray-900 font-semibold py-6 px-8 text-xl rounded-2xl hover:bg-lime-300"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default PackageDetails;
