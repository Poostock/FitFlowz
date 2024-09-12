import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FaRegCircleUser } from "react-icons/fa6";
import FitnessClassCard, { FitnessClass } from '../../components/FitnessClassCard';
import ClassPic from '../../assets/bodyjam.png';

const Class: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Sample array of fitness classes data
  const fitnessClasses: FitnessClass[] = [
    {
      id: 1,
      name: "Yoga for Beginners",
      type: "Yoga",
      description: "A relaxing yoga session for beginners.",
      date: "2024-09-15",
      time: "10:00 AM",
      coach: "John Doe",
      image: ClassPic,
      maxParticipants: 25,
      currentParticipants: 10,
      onBooking: () => "",
    },
    {
      id: 2,
      name: "HIIT Workout",
      type: "HIIT",
      description: "High-Intensity Interval Training for strength and endurance.",
      date: "2024-09-17",
      time: "12:00 PM",
      coach: "Jane Smith",
      image: ClassPic,
      maxParticipants: 30,
      currentParticipants: 18,
      onBooking: () => "",
    },
    {
      id: 3,
      name: "Pilates Core",
      type: "Pilates",
      description: "Focus on core strength and flexibility with Pilates.",
      date: "2024-09-18",
      time: "08:00 AM",
      coach: "Emily Davis",
      image: ClassPic,
      maxParticipants: 20,
      currentParticipants: 15,
      onBooking: () => "",
    },
    {
      id: 4,
      name: "Body Pump",
      type: "Strength",
      description: "A full-body workout with weights.",
      date: "2024-09-19",
      time: "06:00 PM",
      coach: "Michael Brown",
      image: ClassPic,
      maxParticipants: 40,
      currentParticipants: 35,
      onBooking: () => "",
    },
    {
      id: 5,
      name: "Zumba Dance",
      type: "Dance",
      description: "Fun and energetic dance fitness class.",
      date: "2024-09-20",
      time: "05:00 PM",
      coach: "Linda Green",
      image: ClassPic,
      maxParticipants: 50,
      currentParticipants: 45,
      onBooking: () => alert("Success"),
    },
    {
      id: 6,
      name: "Advanced Yoga",
      type: "Yoga",
      description: "A challenging yoga session for advanced practitioners.",
      date: "2024-09-21",
      time: "07:00 AM",
      coach: "Sarah Johnson",
      image: ClassPic,
      maxParticipants: 20,
      currentParticipants: 12,
      onBooking: () => "",
    },
  ];

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
              <div className="absolute right-0 mt-[185px] w-48 bg-sidebar bg-opacity-95 border border-green rounded-lg shadow-lg z-10">
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

        {/* Fitness Class Card Components */}
        <div className="grid gap-4 grid-cols-2 p-4">
          {fitnessClasses.map((fitnessClass) => (
            <FitnessClassCard key={fitnessClass.id} fitnessClass={fitnessClass} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Class;
