import React, { useState, useEffect } from "react";
import { PackageInterface } from "../../../interfaces/IPackage";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CreatePackage, UpdatePackage } from "../../../service/https/package";

interface EditPackageFormProps {
    packageData?: PackageInterface; // Optional prop for pre-filling the form when editing
}

const EditPackageForm: React.FC<EditPackageFormProps> = ({ packageData }) => {
    const [formData, setFormData] = useState<PackageInterface>({
        PackageName: "",
        Description: "",
        Price: "",
        Duration_days: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (packageData) {
            setFormData({
                PackageName: packageData.PackageName || "",
                Description: packageData.Description || "",
                Price: packageData.Price || "",
                Duration_days: packageData.Duration_days || "",
            });
        }
    }, [packageData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        field: keyof PackageInterface
    ) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const packageDataToSubmit: PackageInterface = {
            PackageName: formData.PackageName,
            Description: formData.Description,
            Price: formData.Price ? formData.Price.toString() : "",
            Duration_days: formData.Duration_days,
        };

        try {
            if (packageData) {
                await UpdatePackage({ ...packageDataToSubmit, ID: packageData.ID });
                toast.success("Package updated successfully!");
            } else {
                await CreatePackage(packageDataToSubmit);
                toast.success("Package created successfully!");
            }

            navigate("/admin/package"); // Navigate back to the package list after successful operation
        } catch (error) {
            toast.error("Failed to submit package.");
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Package Name */}
                    <div>
                        <label className="block text-green1 mb-2 text-[20px]">Package Name</label>
                        <input
                            id="PackageName"
                            name="PackageName"
                            type="text"
                            required
                            placeholder="Enter package name"
                            value={formData.PackageName}
                            onChange={(e) => handleInputChange(e, "PackageName")}
                            className="w-full p-3 text-black text-[20px] rounded-lg focus:outline-none focus:ring-2 focus:ring-green5"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-green1 mb-2 text-[20px]">Price</label>
                        <input
                            id="Price"
                            name="Price"
                            type="text"
                            required
                            placeholder="Enter price"
                            value={formData.Price}
                            onChange={(e) => handleInputChange(e, "Price")}
                            className="w-full p-3 bg-white text-black text-[20px] rounded-lg focus:outline-none focus:ring-2 focus:ring-green5"
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-green1 mb-2 text-[20px]">Description</label>
                        <textarea
                            id="Description"
                            name="Description"
                            required
                            placeholder="Enter description"
                            value={formData.Description}
                            onChange={(e) => handleInputChange(e, "Description")}
                            className="w-full p-3 bg-white text-black text-[20px] rounded-lg focus:outline-none focus:ring-2 focus:ring-green5 h-32"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-green1 mb-2 text-[20px]">Duration</label>
                        <select
                            id="Duration_days"
                            name="Duration_days"
                            required
                            value={formData.Duration_days}
                            onChange={(e) => handleInputChange(e, "Duration_days")}
                            className="w-full p-3 text-black text-[20px] rounded-lg focus:outline-none focus:ring-2 focus:ring-green5"
                        >
                            <option value="">Select duration</option>
                            <option value="1 Day">1 Day</option>
                            <option value="1 Month">1 Month</option>
                            <option value="1 Year">1 Year</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="submit"
                            className="bg-green3 hover:bg-green5 text-black font-semibold py-4 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green5 transition-all duration-300 ease-in-out text-[20px]"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
            <Toaster />
        </div>
    );
};

export default EditPackageForm;
