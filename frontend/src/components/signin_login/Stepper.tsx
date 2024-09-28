import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MembersInterface } from "../../interfaces/IMember";
import { GendersInterface } from "../../interfaces/IGender";
import { useNavigate } from "react-router-dom";
import { CreateMember, GetGenders } from "../../service/https/member";

const Stepper: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        GenderID: "",
        PhoneNumber: "",
        Email: "",
        Username: "",
        Password: "",
    });

    const steps = ["Personal Info", "Contact", "Account Info"];
    const [genders, setGenders] = useState<GendersInterface[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenders = async () => {
            const genderData = await GetGenders();
            if (genderData) {
                setGenders(genderData);
            } else {
                toast.error("Failed to fetch genders.");
            }
        };
        fetchGenders();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Password) {
            toast.error("Please fill all required fields");
            return;
        }

        const memberData: MembersInterface = {
            ...formData,
            GenderID: parseInt(formData.GenderID),
        };

        const response = await CreateMember(memberData);

        if (response) {
            toast.success("Member created successfully!");

            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } else {
            toast.error("Failed to create member.");
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2 xl:text-lg text-white">Firstname</div>
                            <input
                                id="FirstName"
                                name="FirstName"
                                type="text"
                                required
                                autoComplete="FirstName"
                                className="block w-full rounded-full text-center bg-gray5 py-3 text-white shadow-sm"
                                placeholder="Enter firstname"
                                value={formData.FirstName}
                                onChange={handleInputChange}
                            />
                            <div className="mt-2">
                                <div className="text-xs text-left mb-2 xl:text-lg text-white">Lastname</div>
                                <input
                                    id="LastName"
                                    name="LastName"
                                    type="text"
                                    required
                                    autoComplete="LastName"
                                    className="block w-full rounded-full text-center bg-gray5 py-3 text-white shadow-sm"
                                    placeholder="Enter lastname"
                                    value={formData.LastName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="GenderID" className=" block text-xs text-left mb-2 xl:text-lg text-white">
                                    Gender
                                </label>
                                <select
                                    id="GenderID"
                                    name="GenderID"
                                    required
                                    className="block w-full rounded-full text-center bg-gray5 py-3 text-white"
                                    value={formData.GenderID}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Choose a gender</option>
                                    {genders.map((gender) => (
                                        <option key={gender.ID} value={gender.ID}>
                                            {gender.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2  xl:text-lg text-white">Phone Number</div>
                            <input
                                id="PhoneNumber"
                                name="PhoneNumber"
                                type="text"
                                required
                                autoComplete="PhoneNumber"
                                className="block w-full rounded-full text-center bg-gray5 py-3 text-white shadow-sm"
                                placeholder="Enter Phone Number"
                                value={formData.PhoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2 xl:text-lg text-white">Email</div>
                            <input
                                id="Email"
                                name="Email"
                                type="email"
                                required
                                autoComplete="Email"
                                className="block w-full rounded-full text-center bg-gray5 py-3 text-white shadow-sm"
                                placeholder="Enter email"
                                value={formData.Email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2 xl:text-lg text-white">Username</div>
                            <input
                                id="Username"
                                name="Username"
                                type="text"
                                required
                                autoComplete="Username"
                                className="block w-full rounded-full text-center bg-gray5 py-3 text-white shadow-sm"
                                placeholder="Enter username"
                                value={formData.Username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2 xl:text-lg text-white">Password</div>
                            <input
                                id="Password"
                                name="Password"
                                type="password"
                                required
                                autoComplete="Password"
                                className="block w-full rounded-full text-center bg-gray5 py-3 text-white shadow-sm"
                                placeholder="Enter password"
                                value={formData.Password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-md mx-auto ">
            {/* Place Toaster at the root level */}
            <Toaster />
            <div className="flex justify-between mb-10">
                {steps.map((step, index) => (
                    <div key={index} className={`relative flex-1 text-center ${index + 1 <= currentStep ? "text-hover" : "text-white"}`}>
                        <div
                            className={`absolute inset-x-0 top-1/2 transform -translate-y-1/2 ${
                                index + 1 < currentStep ? "border-green5" : "border-gray-300"
                            }`}
                        ></div>
                        <div
                            className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full border ${
                                index + 1 <= currentStep ? "border-green5 bg-green5 text-white" : "border-gray-300"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <p className="mt-2 text-white">{step}</p>
                    </div>
                ))}
            </div>
            <div className="mb-[5px]">{renderStepContent()}</div>
            <div className="flex justify-between mt-10 ">
                <button
                    onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                    Previous
                </button>
                {currentStep === steps.length ? (
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green5 text-white rounded">
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length))}
                        className="px-4 py-2 bg-green5 text-white rounded"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Stepper;
