import React, { useState } from "react";
import Input from "../Input";
import toast from "react-hot-toast";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";
import { CreateClassType, UpdateClassType } from "../../../../service/https/class/classType";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: () => void;
    onDelete?: () => void;
    title: string;
    type?: "delete" | "create" | "edit";
    classType?: ClassTypesInterface | null;
    classTypeName?: string;
    fetchClassTypes?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    title,
    type = "create",
    classType,
    classTypeName,
    fetchClassTypes,
}) => {
    const [name, setName] = useState(classType?.Name || "");

    const handleSubmit = async () => {
        if (type === "create") {
            if (!name) {
                toast.error("Please enter a name.");
                return;
            }
            const data: ClassTypesInterface = { Name: name };
            const createClassPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await CreateClassType(data);
                        resolve("Class type created successfully!");
                    } catch {
                        reject("Failed to create class type.");
                    }
                }, 1000);
            });

            toast.promise(createClassPromise, {
                loading: "Creating class type...",
                success: "Class type created successfully!",
                error: "Failed to create class type.",
            });

            try {
                await createClassPromise;
                setName("");
                onClose();
                if (fetchClassTypes) {
                    fetchClassTypes(); // Call fetchClassTypes if it is defined
                }
            } catch (error) {
                console.error("Error creating class type:", error);
            }
        } else if (type === "edit" && classType && onSave) {
            if (!name) {
                toast.error("Please enter a name.");
                return;
            }
            const data: ClassTypesInterface = { ID: classType.ID, Name: name };
            const editClassPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await UpdateClassType(data);
                        resolve("Class type updated successfully!");
                    } catch {
                        reject("Failed to update class type.");
                    }
                }, 1000);
            });

            toast.promise(editClassPromise, {
                loading: "Updating class type...",
                success: "Class type updated successfully!",
                error: "Failed to update class type.",
            });

            try {
                await editClassPromise;
                setName("");
                onClose();
                if (fetchClassTypes) {
                    fetchClassTypes(); // Call fetchClassTypes if it is defined
                }
            } catch (error) {
                console.error("Error update class type:", error);
            }
        } else if (type === "delete" && onDelete) {
            try {
                await onDelete();
                onClose();
            } catch (error) {
                console.error("Error deleting class type:", error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/4 flex flex-col justify-center ">
                <h2 className="text-xl font-bold mb-4 text-black flex justify-center ">{title}</h2>
                {type !== "delete" ? (
                    <>
                        <p className="flex flex-col justify-center items-center">
                            <label className="text-black  text-lg">Name</label>
                            <Input placeholder="Enter Name here" value={name} onChange={(e) => setName(e.target.value)} />
                        </p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                className="bg-rose-500 text-black px-4 py-2 rounded-lg hover:bg-rose-600 hover:text-white"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-green3 text-black px-4 py-2 rounded-lg hover:bg-hover hover:text-white"
                                onClick={handleSubmit}
                            >
                                {type === "create" ? "Save" : "Update"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-black flex justify-center ">Are you sure you want to delete "{classTypeName}"?</p>
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
