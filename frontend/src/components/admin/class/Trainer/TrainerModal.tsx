import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import toast from "react-hot-toast";
import { CreateTrainer, DeleteTrainerByID, UpdateTrainer } from "../../../../service/https/class/trainer";

interface TrainerModalProps {
    isOpen: boolean;
    onClose: () => void;
    fetchTrainers: () => void;
    trainer?: TrainersInterface | null;
    type: "create" | "edit" | "delete";
    trainerName?: string;
}

const TrainerModal: React.FC<TrainerModalProps> = ({ isOpen, onClose, fetchTrainers, trainer, type, trainerName }) => {
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
                fetchTrainers();
            } catch (error) {
                console.error("Error creating trainer:", error);
            }
        } else if (type === "edit" && trainer) {
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
                fetchTrainers();
            } catch (error) {
                console.error("Error updating trainer:", error);
            }
        } else if (type === "delete") {
            if (trainer) {
                try {
                    await DeleteTrainerByID(trainer.ID!);
                    toast.success(`Trainer "${trainerName}" deleted successfully.`);
                    onClose();
                    fetchTrainers();
                } catch (error) {
                    console.error("Error deleting trainer:", error);
                    toast.error("Failed to delete trainer.");
                }
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSave={type === "create" || type === "edit" ? handleSubmit : undefined}
            onDelete={type === "delete" ? handleSubmit : undefined}
            title={type === "create" ? "Create Trainer" : type === "edit" ? "Edit Trainer" : "Confirm Delete"}
            type={type}
            trainer={type === "edit" ? trainer : undefined}
            trainerName={type === "delete" ? trainerName : undefined}
            fetchTrainers={fetchTrainers}
        />
    );
};

export default TrainerModal;
