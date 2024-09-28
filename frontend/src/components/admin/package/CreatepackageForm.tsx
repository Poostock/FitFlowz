import React, { useState } from "react";
import { PackageInterface } from "../../../interfaces/IPackage";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // เพิ่มการนำเข้า
import { CreatePackage } from "../../../service/https/package";


const CreatePackageForm: React.FC = () => {
    const [formData, setFormData] = useState<PackageInterface>({
        PackageName: "",
        Description: "",
        Price: "",
        Duration_days: "",
    });

    const navigate = useNavigate();

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

        const packageData: PackageInterface = {
            PackageName: formData.PackageName,
            Description: formData.Description,
            Price: formData.Price ? formData.Price.toString() : "", // Ensure Price is a string
            Duration_days: formData.Duration_days,
        };

        const success = await CreatePackage(packageData);

        if (success) {
            toast.success("Package created successfully!");
            // Reset form
            setFormData({
                PackageName: "",
                Description: "",
                Price: "", // Reset to empty string
                Duration_days: "",
            });

            navigate("/admin/package");
        } else {
            alert("Failed to create package.");
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
                    {/* <button
                        type="button"
                        className="bg-red hover:bg-rose-500 text-black font-semibold py-4 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out text-[20px]"
                    >
                        Delete
                    </button> */}
                    <button
                        type="submit"
                        className="bg-green3 hover:bg-green5 text-black font-semibold py-4 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green5 transition-all duration-300 ease-in-out text-[20px]"
                    >
                        Save
                    </button>
                </div>
                </div>

                {/* Buttons */}
                
            </form>
            <Toaster/>
        </div>
    );
};

export default CreatePackageForm;
