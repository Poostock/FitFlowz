import React from "react";

import { MdPeople } from "react-icons/md";

// File: ../interface/Ifitness.ts

export interface FitnessClass {
  name: string;
  type: string;
  description: string;
  date: string;
  time: string;
  coach: string;
  image: string; // URL to the image
  maxParticipants: number; // maximum number of participants
  currentParticipants: number; // current number of participants
}

interface FitnessClassCardProps {
  fitnessClass: FitnessClass;
}

const FitnessClassCard: React.FC<FitnessClassCardProps> = ({ fitnessClass }) => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden ml-4 max-h-80">
      <img
        src={fitnessClass.image}
        alt={fitnessClass.name}
        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
      />
      <div className="p-4 flex flex-col justify-between w-full md:w-2/3 text-start bg-sidebar">
        <div>
          <div className="text-iconUser">{fitnessClass.type}</div>
          <h2 className="text-xl md:text-2xl text-iconUser">
            {fitnessClass.name}
          </h2>
          <p className="text-iconUser">{fitnessClass.description}</p>
          <div className="text-iconUser mt-2">
            <p>{fitnessClass.date}</p>
            <p>{fitnessClass.time}</p>
          </div>
          <p className="text-iconUser">By {fitnessClass.coach}</p>
        </div>
        <div className="flex justify-between ">
          <button className="bg-hover text-black px-4 py-2 rounded self-start">
            Join
          </button>
          <div className="gap-4 items-center text-xl flex ">
            <MdPeople className="size-10 fill-primary" />
            <div className="text-primary">
              {fitnessClass.currentParticipants}/{fitnessClass.maxParticipants}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessClassCard;
