import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FaRegCircleUser } from "react-icons/fa6";
import FitnessClassCard from '../../components/FitnessClassCard';
import { FitnessClass } from '../../interfaces/Ifitness';
import ClassPic from '../../assets/bodyjam.png'


const Class: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Sample fitness class data
  const sampleClass: FitnessClass = {
    name: "Yoga for Beginners",
    type: "Yoga",
    description: "A relaxing yoga session for beginners.",
    date: "2024-09-15",
    time: "10:00 AM",
    coach: "John Doe",
    image: ClassPic,
    maxParticipants: 25,
    currentParticipants: 2,
  };

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main content area */}
      <div className="bg-black w-full">
        {/* Navbar */}
        <div className="navbar bg-forth h-[76px] flex items-center border-b-4 border-primary">
          <h1 className="text-xl text-secondary ml-14">Class</h1>
          
          {/* User Icon and Dropdown */}
          <div className="flex items-center ml-auto mr-14 relative">
            <FaRegCircleUser
              className="text-iconUser text-[31px] cursor-pointer"
              onClick={toggleDropdown}
            />
            
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-10 w-48 bg-sidebar bg-opacity-95 border border-green rounded-lg shadow-lg z-10">
                <ul className="text-white p-2">
                  <li className="p-2 hover:bg-hover cursor-pointer">Profile</li>
                  <li className="p-2 hover:bg-hover cursor-pointer">History</li>
                  <li className="p-2 hover:bg-hover cursor-pointer">Settings</li>
                  <li className="p-2 hover:bg-hover cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Fitness Class Card Component */}
        <div className=" grid gap-4 grid-cols-2">
          <div><FitnessClassCard fitnessClass={sampleClass} /></div>
          <div><FitnessClassCard fitnessClass={sampleClass} /></div>
          <div><FitnessClassCard fitnessClass={sampleClass} /></div>
          <div><FitnessClassCard fitnessClass={sampleClass} /></div>
          <div><FitnessClassCard fitnessClass={sampleClass} /></div>
          <div><FitnessClassCard fitnessClass={sampleClass} /></div>
        </div>
      </div>
    </div>
  );
};

export default Class;
