import React, { useEffect, useState } from "react";
// import AOS from "aos";
import "aos/dist/aos.css";
import Card from "../../../components/payment/Card";
import myImage from "../../../assets/1.jpg";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import { PackageInterface } from "../../../interfaces/IPackage";
import { GetPackages } from "../../../service/https/payment";

const Package: React.FC = () => {
    const [packages, setPackages] = useState<PackageInterface[]>([]);
    const navigate = useNavigate();

    const fetchPackages = async () => {
        try {
            const res = await GetPackages();
            console.log("Packages data:", res); // Debugging log
            if (res) {
                setPackages(res);
            }
        } catch (error) {
            console.error("Failed to fetch packages.", error);
        }
    };

    const handlePurchase = (pkg: PackageInterface) => {
        navigate("/payment", { state: { package: pkg } });
        console.log(pkg)
    };

    useEffect(() => {
        fetchPackages();
    }, []); // Dependency array added to prevent infinite loop

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white">
            {/* Header Section */}
            <div className="bg-cover bg-center h-60 w-full flex items-center justify-center" style={{ backgroundImage: `url(${myImage})` }}>
                {/* Add content here if needed */}
            </div>
            <div className="text-center text-4xl font-bold mt-8">Our Fitness Pass</div>

            {/* Packages Section */}
            <div className="container mx-auto py-12 px-6">
                {packages.length === 0 ? (
                    <p className="text-center text-xl">No packages available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 z-50">
                        {packages.map((pkg, index) => {
                            console.log("Package data:", pkg); // Debugging each package
                            return (
                                <Card
                                    key={pkg.ID || index}
                                    name={pkg.PackageName || "No Name"}
                                    price={pkg.Price ? pkg.Price.toString() : "No Price"}
                                    description={pkg.Description || "No Description"}
                                    duration={pkg.Duration_days || "No Duration"}
                                    // aosDelay={(index * 100).toString()}
                                    onPurchase={() => handlePurchase(pkg)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Package;
