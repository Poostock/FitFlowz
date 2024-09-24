import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FaRegCircleUser } from "react-icons/fa6";
import FitnessClassCard, { FitnessClass } from "../../components/FitnessClassCard";
import { GetClasses, GetMembers } from "../../service/https";
import { MembersInterface } from "../../interfaces/IMember";

// Extend dayjs to use timezone
dayjs.extend(utc);
dayjs.extend(timezone);

interface ClassType {
  ID: number;
  Name: string;
}

interface Trainer {
  ID: number;
  Name: string;
}

interface ClassData {
  ID: number;
  ClassName: string;
  ClassPic: string;
  Deets: string;
  StartDate: string;
  EndDate: string;
  Trainer: Trainer;
  ParticNum: number;
  ClassType: ClassType;
}

const ClassComponent: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [member, setMember] = useState<MembersInterface | null>(null); // ดึงข้อมูลสมาชิก

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const fetchClasses = async () => {
    try {
      const res = await GetClasses();
      if (res) {
        setClasses(res);
      }
    } catch (error) {
      console.error("ดึงข้อมูลคลาสล้มเหลว", error);
    }
  };

  const fetchMember = async () => {
    try {
      const res = await GetMembers();
      if (res && res.ID) { // ตรวจสอบว่ามีข้อมูล ID ของสมาชิก
        setMember(res);  
      } else {
        console.error("ไม่พบข้อมูลสมาชิกหรือ ID ไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("ดึงข้อมูลสมาชิกล้มเหลว", error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchMember(); // ดึงข้อมูลสมาชิก
  }, []);

  const mapToFitnessClass = (classData: ClassData): FitnessClass => ({
    id: classData.ID,
    name: classData.ClassName,
    type: classData.ClassType.Name,
    description: classData.Deets,
    date: classData.StartDate,
    time: classData.EndDate,
    coach: classData.Trainer.Name,
    image: classData.ClassPic,
    maxParticipants: 40, 
    currentParticipants: classData.ParticNum,
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-black w-full">
        <div className="navbar bg-forth h-[76px] flex items-center border-b-4 border-primary">
          <h1 className="text-xl text-secondary ml-14">Class</h1>
          <div className="flex items-center ml-auto mr-14 relative">
            <FaRegCircleUser className="text-iconUser text-[31px] cursor-pointer" onClick={toggleDropdown} />
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
        <div className="grid gap-4 grid-cols-2 p-4">
          {!member ? (
            <p className="text-red-500">กรุณาล็อกอินเพื่อจองคลาส</p>
          ) : (
            classes.map((fitnessClass) => (
              <FitnessClassCard 
                key={fitnessClass.ID} 
                fitnessClass={mapToFitnessClass(fitnessClass)} 
                member={member}  // ส่งข้อมูล member
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassComponent;
