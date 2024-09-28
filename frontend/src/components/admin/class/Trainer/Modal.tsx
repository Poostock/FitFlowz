import React, { useState, useEffect } from "react";
import "../../../../App.css";
import Input from "../../../../components/admin/class/Input";
import toast from "react-hot-toast";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { CreateTrainer, UpdateTrainer } from "../../../../service/https/class/trainer";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    title: string;
    type?: "delete" | "create" | "edit";
    trainerName?: string;
    trainer?: TrainersInterface | null;
    fetchTrainers?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onDelete,
    onSave,
    title,
    type = "create",
    trainer,
    trainerName,
    fetchTrainers,
}) => {
    const [name, setName] = useState(trainer?.Name || "");

    useEffect(() => {
        if (trainer) {
            setName(trainer.Name || "");
        }
    }, [trainer]);

    const handleSubmit = async () => {
        if (type === "create") {
            if (!name) {
                toast.error("Please enter a name.");
                return;
            }
            const data: TrainersInterface = { Name: name };
            const createTrainerPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await CreateTrainer(data);
                        resolve("Add trainer successfully!");
                    } catch {
                        reject("Failed to add trainer.");
                    }
                }, 1000);
            });

            toast.promise(createTrainerPromise, {
                loading: "Adding trainer...",
                success: "Add trainer successfully!",
                error: "Failed to add trainer.",
            });

            try {
                await createTrainerPromise;
                setName("");
                onClose();
                if (fetchTrainers) fetchTrainers();
            } catch (error) {
                console.error("Error creating trainer:", error);
            }
        } else if (type === "edit" && trainer && onSave) {
            if (!name) {
                toast.error("Please enter a name.");
                return;
            }
            const data: TrainersInterface = { ID: trainer.ID, Name: name };
            const editTrainerPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await UpdateTrainer(data);
                        resolve("Updated trainer successfully!");
                    } catch {
                        reject("Failed to update trainer.");
                    }
                }, 1000);
            });

            toast.promise(editTrainerPromise, {
                loading: "Updating Trainer...",
                success: "Updated trainer successfully!",
                error: "Failed to update Trainer.",
            });

            try {
                await editTrainerPromise;
                setName("");
                onClose();
                if (fetchTrainers) fetchTrainers();
            } catch (error) {
                console.error("Error updating trainer:", error);
            }
        } else if (type === "delete" && onDelete) {
            try {
                await onDelete();
                onClose();
            } catch (error) {
                console.error("Error deleting trainer:", error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/4 flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-4 text-black flex justify-center">{title}</h2>
                {type !== "delete" ? (
                    <>
                        <p className="flex flex-col justify-center items-center">
                            <label className="text-black text-lg">Name</label>
                            <Input placeholder="Enter Name here" value={name} onChange={(e) => setName(e.target.value)} />
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-rose-500 text-black px-4 py-2 rounded-lg hover:bg-rose-600 hover:text-white"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-green3 text-black px-4 py-2 rounded-lg hover:bg-green5 hover:text-white"
                                onClick={handleSubmit}
                            >
                                {type === "create" ? "Save" : "Update"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-black flex justify-center">Are you sure you want to delete "{trainerName}"?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-rose-500 text-black px-4 py-2 rounded-lg hover:bg-rose-600 hover:text-white"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green3 text-black px-4 py-2 rounded-lg hover:bg-green5 hover:text-white"
                                onClick={handleSubmit}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;
