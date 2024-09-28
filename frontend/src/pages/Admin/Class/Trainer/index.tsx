import React, { useState, useEffect } from "react";
import "../../../../App.css";
import SideBar from "../../../../components/admin/class/SideBar";
import Navbar from "../../../../components/admin/class/Navbar";
import Modal from "../../../../components/admin/class/Trainer/Modal";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { GrAddCircle } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { DeleteTrainerByID, UpdateTrainer, CreateTrainer, GetTrainers } from "../../../../service/https/class/trainer";

const Trainer: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [trainerToDelete, setTrainerToDelete] = useState<number | null>(null);
    const [trainerNameToDelete, setTrainerNameToDelete] = useState<string>("");

    const [trainerToEdit, setTrainerToEdit] = useState<TrainersInterface | null>(null);
    const [trainers, setTrainers] = useState<TrainersInterface[]>([]);
    const [name, setName] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = (trainer: TrainersInterface) => {
        setTrainerToEdit(trainer);
        setName(trainer.Name || ""); // Initialize name for editing
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    const openDeleteModal = (id: number, name: string) => {
        setTrainerToDelete(id);
        setTrainerNameToDelete(name);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDelete = async () => {
        if (trainerToDelete !== null) {
            try {
                await DeleteTrainerByID(trainerToDelete);
                toast.success(`Trainer "${trainerNameToDelete}" has been deleted successfully.`);
                fetchTrainers();
            } catch {
                toast.error("Failed to delete trainer.");
            }
            closeDeleteModal();
        }
    };

    const handleSave = async () => {
        if (!name) {
            toast.error("Please enter a name.");
            return;
        }

        if (trainerToEdit) {
            // Update trainer
            const data: TrainersInterface = { ID: trainerToEdit.ID, Name: name };
            try {
                await UpdateTrainer(data);
                toast.success("Updated trainer successfully!");
                fetchTrainers();
                closeEditModal();
            } catch {
                toast.error("Failed to update trainer.");
            }
        } else {
            // Create new trainer
            const data: TrainersInterface = { Name: name };
            try {
                await CreateTrainer(data);
                toast.success("Added trainer successfully!");
                fetchTrainers();
                closeModal();
            } catch {
                toast.error("Failed to add trainer.");
            }
        }
    };

    const fetchTrainers = async () => {
        try {
            const res = await GetTrainers();
            if (res) setTrainers(res);
        } catch (error) {
            console.error("Failed to fetch trainers", error);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full h-screen">
                <Navbar title="Class" />
                <div>
                    <div className="navbar bg-black h-[76px] flex items-center">
                        <h1 className="text-3xl text-green1 ml-14 mt-2">Trainer</h1>
                        <div className="ml-auto mr-14 mt-2">
                            <button
                                className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 shadow-md hover:shadow-lg"
                                onClick={openModal}
                            >
                                <GrAddCircle className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                    <div className="text-white bg-black flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            {trainers.map((trainer) => {
                                const base64String = trainer.TrainerPic || "";
                                const imageSrc = base64String.startsWith("data:image/")
                                    ? base64String
                                    : `data:image/jpeg;base64,${base64String}`;
                                return (
                                    <div className="py-10 px-10 max-w-sm mx-auto bg-gray4 rounded-xl shadow-lg flex flex-col items-center space-y-2 sm:py-6">
                                        <img className="h-32 w-32 rounded-full object-cover" src={imageSrc} alt={trainer.Name} />
                                        <div className="flex flex-col items-center text-center space-y-2">
                                            <p className="text-lg text-white font-semibold">{trainer.Name}</p>
                                            <div className="flex space-x-2">
                                                <button
                                                    className="px-4 py-2 text-sm text-green5 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-green5 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                                                    onClick={() => openEditModal(trainer)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="px-4 py-2 text-sm text-rose-600 font-semibold rounded-full border border-rose-200 hover:text-white hover:bg-rose-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2"
                                                    onClick={() => openDeleteModal(trainer.ID!, trainer.Name ?? "Unnamed Trainer")}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <Toaster />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Create Trainer"
                type="create"
                fetchTrainers={fetchTrainers}
                onSave={handleSave}
            />
            {isEditModalOpen && trainerToEdit && (
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    title="Edit Trainer"
                    type="edit"
                    trainer={trainerToEdit}
                    fetchTrainers={fetchTrainers}
                    onSave={handleSave}
                />
            )}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDelete}
                title="Confirm Delete"
                type="delete"
                trainerName={trainerNameToDelete}
            />
        </div>
    );
};

export default Trainer;
