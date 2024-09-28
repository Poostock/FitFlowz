import React, { useState, useEffect } from "react";
import { GrAddCircle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../../components/admin/class/SideBar";
import Navbar from "../../../components/admin/class/Navbar";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { DeleteClassByID, GetClasses } from "../../../service/https/class";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ClassType {
    ID: number;
    Name: string;
}

interface Trainer {
    ID: number;
    Name: string
}

interface Class {
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

const Class: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [classToDelete, setClassToDelete] = useState<number | null>(null);
    const [classNameToDelete, setClassNameToDelete] = useState<string>("");

    const navigate = useNavigate();

    const fetchClasses = async () => {
        try {
            const res = await GetClasses();
            if (res) {
                setClasses(res);
            }
        } catch (error) {
            console.error("Failed to fetch classes", error);
        }
    };

    const handleEditClick = (id: number) => {
        navigate(`/class/edit/${id}`);
    };

    const handleDeleteClick = (id: number, className: string) => {
        setClassToDelete(id);
        setClassNameToDelete(className);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (classToDelete !== null) {
            const deleteClassPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await DeleteClassByID(classToDelete);
                        resolve("Class deleted");
                        setClasses(classes.filter((cls) => cls.ID !== classToDelete));
                    } catch (error) {
                        reject(error);
                    }
                }, 1000);
            });

            toast.promise(deleteClassPromise, {
                loading: "Deleting...",
                success: <b>Class "{classNameToDelete}" has been deleted successfully.</b>,
                error: <b>Failed to delete class.</b>,
            });
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full h-screen">
                <Navbar title="Class" />
                <div className="navbar bg-black h-[76px] flex items-center">
                    <div className="ml-auto mr-14">
                        <Link to="/class/create">
                            <button className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 shadow-md hover:shadow-lg">
                                <GrAddCircle className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                                <span>Create</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="text-white bg-black overflow-auto h-[520px] scrollable-div">
                    <div className="flex flex-wrap justify-center">
                        {classes.map((cls) => {
                            const base64String = cls.ClassPic || "";
                            const imageSrc = base64String.startsWith("data:image/")
                                ? base64String
                                : `data:image/jpeg;base64,${base64String}`;

                            return (
                                <div
                                    key={cls.ID}
                                    className="bg-gray4 ml-14 w-[500px] h-[510px] rounded-3xl relative mb-7 mr-7 overflow-auto scrollable-div"
                                >
                                    <div className="flex ml-6 pt-6 h-auto">
                                        <div className="flex flex-col items-start relative">
                                            <img
                                                src={imageSrc}
                                                alt={cls.ClassName}
                                                className="w-[454px] h-[280px] rounded-3xl object-cover"
                                            />
                                            <div className="absolute top-0 left-0 p-4">
                                                <h1 className="text-green1 mb-1 text-[26px]">{cls.ClassType.Name}</h1>
                                                <h2 className="text-green3 mb-2 text-[38px]">{cls.ClassName}</h2>
                                            </div>
                                            <h3 className="text-green1 mt-2 mb-2 mr-6 text-[20px]">{cls.Deets}</h3>
                                            <h4 className="text-green1 mb-2 text-[20px]">
                                                {dayjs.tz(cls.StartDate, "Asia/Bangkok").format("D MMM YYYY")} <br />
                                                {dayjs(cls.StartDate).format("HH:mm")} - {dayjs(cls.EndDate).format("HH:mm")}
                                            </h4>
                                            <h5 className="text-green1 mb-2 text-[20px]">By {cls.Trainer.Name}</h5>
                                            <h5 className="text-green1 mb-6 text-[20px]">No. of Attendees {cls.ParticNum || "N/A"}</h5>
                                        </div>
                                    </div>
                                    <button
                                        className="absolute top-8 right-20 bg-gray2 py-2 px-2 rounded-xl hover:bg-green5"
                                        onClick={() => handleEditClick(cls.ID)}
                                    >
                                        <MdEdit className="w-[24px] h-auto cursor-pointer text-black hover:text-white" />
                                    </button>
                                    <button
                                        className="absolute top-8 right-8 bg-gray2 py-2 px-2 rounded-xl hover:bg-rose-600"
                                        onClick={() => handleDeleteClick(cls.ID, cls.ClassName)}
                                    >
                                        <MdDeleteForever className="w-[24px] h-auto cursor-pointer text-black hover:text-white" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray4 p-6 rounded-lg shadow-lg text-white border border-green3">
                        <h2 className="text-lg">Confirm Deletion</h2>
                        <p className="mt-2">Are you sure you want to delete the class "{classNameToDelete}"?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-rose-500 text-white px-4 py-2 rounded-md mr-2" onClick={confirmDelete}>
                                Delete
                            </button>
                            <button className="bg-gray2 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default Class;
