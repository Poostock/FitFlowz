import React from "react";
import Input from "../../../../components/admin/class/Input";
import { TrainersInterface } from "../../../../interfaces/ITrainer";

interface TrainerFormProps {
    trainer?: TrainersInterface | null;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
    onClose: () => void;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ trainer, name, setName, onSubmit, onClose }) => {

    
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="flex flex-col justify-center items-center">
                <label className="text-black text-lg">Name</label>
                <Input placeholder="Enter Name here" value={name} onChange={(e) => setName(e.target.value)} />
            </p>
            <div className="flex justify-center gap-4 mt-4">
                <button className="bg-green3 text-black px-4 py-2 rounded-lg hover:bg-green5 hover:text-white" onClick={onSubmit}>
                    {trainer ? "Update" : "Save"}
                </button>
                <button className="bg-rose-500 text-black px-4 py-2 rounded-lg hover:bg-rose-600 hover:text-white" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default TrainerForm;
