import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInInterface } from "../../interfaces/ISignIn";

import toast, { Toaster } from "react-hot-toast"; // Import toast functions
import { SignIn } from "../../service/https";
import { CheckSubscription } from "../../service/https/admin";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate(); // ใช้สำหรับการนำทาง

    const handleSignIn = async () => {
        const signInData: SignInInterface = {
            username,
            password,
        };

        try {
            const result = await SignIn(signInData);

            // Check if result contains the expected fields
            if (result && result.role && result.token) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("id", result.id);
                localStorage.setItem("role", result.role);
                toast.success("Login successful!"); // Show success toast

                if (result.role === "admin") {
                    setTimeout(() => navigate("/dashboard"), 600); // Delay navigation
                } else if (result.role === "member") {
                    const check = await CheckSubscription(result.id);
                    console.log(check);
                    if (check.message === "Subscribed") {
                        setTimeout(() => navigate("/classBooking"), 600); // Delay navigation
                    } else {
                        setTimeout(() => navigate("/package"), 600);
                    }
                }
            } else {
                // Handle case where result doesn't have the expected fields
                toast.error("Unexpected response from server. Please try again.");
            }
        } catch (error) {
            console.error("Failed to sign in:", error);
            toast.error("Invalid username or password. Please try again."); // Show error toast
        }
    };

    return (
        <div className="h-full flex  mb-20 p-15 xl:mt-4 ">
            <div className="w-1/5 text-center"></div>
            <div className="w-3/5 text-center h-auto">
                <div className="text-lime-200">
                    <div className="text-5xl font-extrabold mt-20 mb-10 xl:text-5xl xl:mb-5 ">Login</div>
                    <div className="text-5xl font-extrabold mb-20 p-15 xl:text-4xl xl:mb-5">"Unlock your potential."</div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <div className="mt-2 text-left ">
                                <div className="text-xs mb-2 text-white xl:text-lg">Enter your Username</div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoComplete="username"
                                    className="block w-full rounded-full text-center py-3 text-gray-100 shadow-sm bg-gray5"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2 text-left">
                                <div className="text-xs mb-2 text-white xl:text-lg">Enter your Password</div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-full text-center py-3 text-gray-100 shadow-sm bg-gray5"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className="w-4/5 mb-4 text-2xl mt-3 rounded-full font-bold bg-lime-400 text-black hover:bg-black hover:text-white py-2 transition-colors duration-300 xl:w-3/4"
                                type="button"
                                onClick={handleSignIn}
                            >
                                Login
                            </button>

                            <div className=" text-white mt-5 xl:mt-[17.9px]">
                                Don't have an account?
                                <Link to="/Register" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster /> {/* Add Toaster for displaying toast notifications */}
        </div>
    );
};

export default LoginForm;
