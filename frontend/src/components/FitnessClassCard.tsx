import React, { useState } from "react";
import { MdPeople } from "react-icons/md";
import { CreateBooking } from "../service/https"; // ตรวจสอบ path ให้ถูกต้อง
import { BookingInterface } from "../interfaces/IBooking";
import toast, { Toaster } from "react-hot-toast";

// Interface for fitness class
export interface FitnessClass {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string;
  time: string;
  coach: string;
  image: string;
  maxParticipants: number;
  currentParticipants: number;
  onBooking?: () => void; // Optional
}

interface FitnessClassCardProps {
  fitnessClass: FitnessClass;
}

const FitnessClassCard: React.FC<FitnessClassCardProps> = ({ fitnessClass }) => {
  const { id, name, type, description, date, time, coach, image, maxParticipants, onBooking } = fitnessClass;

  const [currentParticipants, setCurrentParticipants] = useState<number>(fitnessClass.currentParticipants);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const currDate = new Date();

  // Handle join class
  const handleJoin = async () => {
    const data: BookingInterface = {
      DateBooking: currDate,
      ClassID: id,
      MemberID: 1
    };

    if (currentParticipants < maxParticipants) {
      setLoading(true);
      try {
        const response = await CreateBooking(data);
        console.log("API response:", response); // ตรวจสอบข้อมูลที่ได้รับจาก API

        if (response) {
          setCurrentParticipants(prev => prev + 1);
          setHasJoined(true);
          toast.success("Successfully joined the class!");
          if (onBooking) {
            onBooking(); // Optionally call onBooking if provided
          }
        } else {
          toast.error("Failed to join the class. Please try again.");
        }
      } catch (error) {
        console.error("Error joining the class:", error);
        toast.error("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Class is full.");
    }
  };

  // Handle cancel class
  const handleCancel = async () => {
    // Optionally handle cancellation logic here
    // Assuming you have an API endpoint to cancel booking

    // For now, we'll just update the state directly
    setCurrentParticipants(prev => prev - 1);
    setHasJoined(false);
    toast.success("Successfully left the class!");
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden ml-4 max-h-80">
      <img
        src={image}
        alt={name}
        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
      />
      <div className="p-4 flex flex-col justify-between w-full md:w-2/3 text-start bg-sidebar">
        <div>
          <div className="text-iconUser">{type}</div>
          <h2 className="text-xl md:text-2xl text-iconUser">{name}</h2>
          <p className="text-iconUser">{description}</p>
          <div className="text-iconUser mt-2">
            <p>{date}</p>
            <p>{time}</p>
          </div>
          <p className="text-iconUser">By {coach}</p>
        </div>
        <div className="flex justify-between items-center">
          {!hasJoined ? (
            <button
              className="px-4 py-2 rounded self-start bg-hover hover:bg-hover text-white"
              onClick={handleJoin}
              disabled={loading}
            >
              {loading ? "Processing..." : "Join"}
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded self-start bg-red-500 hover:bg-red-600 text-white"
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? "Processing..." : "Cancel"}
            </button>
          )}
          <div className="flex gap-4 items-center text-xl">
            <MdPeople className="fill-primary" />
            <div className="text-primary">
              {currentParticipants}/{maxParticipants}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default FitnessClassCard;
