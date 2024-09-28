import React from "react";
import { GrAddCircle } from "react-icons/gr";

interface TrainerHeaderProps {
    onAdd: () => void;
}

const TrainerHeader: React.FC<TrainerHeaderProps> = ({ onAdd }) => {
    return (
        <div className="navbar bg-black h-[76px] flex items-center">
            <h1 className="text-3xl text-green1 ml-14 mt-2">Trainer</h1>
            <div className="ml-auto mr-14 mt-2">
                <button
                    className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 shadow-md hover:shadow-lg"
                    onClick={onAdd}
                >
                    <GrAddCircle className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                    <span>Add</span>
                </button>
            </div>
        </div>
    );
};

export default TrainerHeader;
