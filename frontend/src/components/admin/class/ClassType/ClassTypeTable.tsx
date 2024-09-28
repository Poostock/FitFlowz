import React from "react";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ClassTypeTableProps {
    classTypes: ClassTypesInterface[];
    onEdit: (classType: ClassTypesInterface) => void;
    onDelete: (id: number, name: string) => void;
}

const ClassTypeTable: React.FC<ClassTypeTableProps> = ({ classTypes, onEdit, onDelete }) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="text-left">
                    <th className="border-b p-2 w-1/6"></th>
                    <th className="border-b p-2 w-1/2">Name</th>
                    <th className="border-b p-2 w-1/3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {classTypes.map((classType, index) => (
                    <tr key={classType.ID}>
                        <td className="border-b p-2 text-center">{index + 1}</td>
                        <td className="border-b p-2">{classType.Name}</td>
                        <td className="border-b p-2">
                            <div className="space-x-6 flex items-center">
                            <button onClick={() => onEdit(classType)}>
                                <FiEdit className="text-green2 w-6 h-auto" />
                            </button>
                            <button
                                
                                onClick={() => onDelete(classType.ID!, classType.Name ?? "Unnamed Class Type")}
                            >
                                <RiDeleteBin6Line className=" text-rose-600 w-7 h-auto "/>
                            </button>
                            </div>
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClassTypeTable;
