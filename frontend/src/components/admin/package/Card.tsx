import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { HiDotsHorizontal } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import "../../../App.css"; // Ensure your CSS styles are correctly imported
import { DeletePackageByID } from "../../../service/https/package";

const Card: React.FC<{
    id: number; // Keep the package ID for internal reference
    name: string;
    price: string; // Assuming price is a string, if it's a number change this type
    duration: string;
    description: string;
    onDelete: (id: number) => void; // Add the delete handler prop
}> = ({ id, name, price, duration, description, onDelete }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [packageToDelete, setPackageToDelete] = useState<string>(""); // Change to string for name
    const [packageIdToDelete, setPackageIdToDelete] = useState<number | null>(null); // Keep track of package ID

    const navigate = useNavigate(); // Create navigate function

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleEditClick = () => {
        navigate(`/admin/package/edit/${id}`); // Navigate to edit page with the package ID
        setDropdownOpen(false); // Close dropdown after click
    };

    const handleDeleteClick = () => {
        setPackageToDelete(name); // Set the name for the confirmation modal
        setPackageIdToDelete(id); // Store the ID to delete later
        setIsModalOpen(true);
        setDropdownOpen(false); // Close dropdown when delete is initiated
    };

    const confirmDelete = async () => {
        if (packageIdToDelete !== null) {
            try {
                await DeletePackageByID(packageIdToDelete); // Call API to delete the package by ID
                onDelete(packageIdToDelete); // Call the onDelete prop to update parent state
                toast.success(<b>Package "{packageToDelete}" has been deleted successfully.</b>);
            } catch (error) {
                console.error("Error deleting package:", error); // Log the error for debugging
                toast.error(<b>Failed to delete package.</b>);
            }
        }
        setIsModalOpen(false);
    };

    return (
        <div className="relative border-2 border-green3 text-white p-12 rounded-2xl shadow-lg text-center w-full flex flex-col justify-between">
            <HiDotsHorizontal className="absolute top-4 right-4 text-green3 cursor-pointer h-7 w-auto" onClick={toggleDropdown} />
            {isDropdownOpen && (
                <div className="absolute right-2  w-24 bg-gray4 bg-opacity-95 border border-green3 rounded-lg shadow-lg z-10">
                    <ul className="text-white p-2">
                        <li className="p-2 hover:bg-green5 cursor-pointer" onClick={handleEditClick}>
                            Edit
                        </li>
                        <li className="p-2 hover:bg-red cursor-pointer" onClick={handleDeleteClick}>
                            Delete
                        </li>
                    </ul>
                </div>
            )}
            <h2 className="text-2xl font-semibold mb-4 bg-green4 rounded-full text-black">{name}</h2>
            {/* Ensure that price is displayed correctly */}
            <p className="text-3xl font-bold mb-4">{price} ฿</p>
            <p className="text-xl mb-5">{description}</p>
            <p className="font-semibold text-lg mb-5">Duration: {duration}</p>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray4 p-6 rounded-lg shadow-lg text-white border border-green3">
                        <p className="mb-4">Are you sure you want to delete "{packageToDelete}"?</p>
                        <button className="bg-rose-500 hover:bg-rose-700 text-white py-2 px-4 rounded mr-4" onClick={confirmDelete}>
                            Yes, delete
                        </button>
                        <button className="bg-green3 hover:bg-green5 text-white py-2 px-4 rounded" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <Toaster /> {/* Toast notifications */}
        </div>
    );
};

export default Card;
