import React from "react";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { GrEdit, GrTrash } from "react-icons/gr";

interface TrainerListProps {
    trainers: TrainersInterface[];
    onEdit: (trainer: TrainersInterface) => void;
    onDelete: (id: number, name: string) => void;
}

const TrainerList: React.FC<TrainerListProps> = ({ trainers, onEdit, onDelete }) => {
    return (
        <div className="text-white bg-black flex justify-center">
            <div className="w-[700px] h-[490px] items-center bg-gray4 rounded-xl mt-6 overflow-auto scrollable-div">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left">
                            <th className="border-b p-2 w-1/6"></th>
                            <th className="border-b p-2 w-1/2">Name</th>
                            <th className="border-b p-2 w-1/3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((trainer, index) => (
                            <tr key={trainer.ID}>
                                <td className="border-b p-2 text-center">{index + 1}</td>
                                <td className="border-b p-2">{trainer.Name}</td>
                                <td className="border-b p-2">
                                    <button
                                        className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 flex items-center"
                                        onClick={() => onEdit(trainer)}
                                    >
                                        <GrEdit className="mr-2" /> Edit
                                    </button>
                                    <button
                                        className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 flex items-center"
                                        onClick={() => onDelete(trainer.ID!, trainer.Name ?? "Unnamed Trainer")}
                                    >
                                        <GrTrash className="mr-2" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrainerList;
