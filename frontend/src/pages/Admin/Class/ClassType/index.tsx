import React, { useState, useEffect } from "react";
import Modal from "../../../../components/admin/class/ClassType/Modal";
import ClassTypeTable from "../../../../components/admin/class/ClassType/ClassTypeTable";
import SideBar from "../../../../components/admin/class/SideBar";
import Navbar from "../../../../components/admin/class/Navbar";
import { GrAddCircle } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";
import { DeleteClassTypesByID, GetClassTypes } from "../../../../service/https/class/classType";

// Utility for modal management
const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return { isOpen, openModal, closeModal };
};

const ClassType: React.FC = () => {
    // Modal state hooks
    const createModal = useModal();
    const editModal = useModal();
    const deleteModal = useModal();

    // State for class type management
    const [classtypes, setClassTypes] = useState<ClassTypesInterface[]>([]);
    const [classTypeToDelete, setClassTypeToDelete] = useState<number | null>(null);
    const [classTypeNameToDelete, setClassTypeNameToDelete] = useState<string>("");
    const [classTypeToEdit, setClassTypeToEdit] = useState<ClassTypesInterface | null>(null);

    // Fetch class types
    const fetchClassTypes = async () => {
        try {
            const res = await GetClassTypes();
            if (res) setClassTypes(res);
        } catch (error) {
            console.error("Failed to fetch classes", error);
        }
    };

    // Handle delete class type
    const handleDelete = async () => {
        if (classTypeToDelete !== null) {
            const deleteClassPromise = new Promise((resolve, reject) => {
                DeleteClassTypesByID(classTypeToDelete)
                    .then(() => {
                        resolve("Class deleted successfully.");
                    })
                    .catch(() => {
                        reject("Failed to delete class.");
                    });
            });

            toast.promise(deleteClassPromise, {
                loading: "Deleting...",
                success: <b>Class "{classTypeNameToDelete}" has been deleted successfully.</b>,
                error: <b>Failed to delete class.</b>,
            });

            try {
                await deleteClassPromise;
                fetchClassTypes();
            } finally {
                deleteModal.closeModal();
            }
        }
    };

    // Open modals with selected class type
    const openEditModal = (classType: ClassTypesInterface) => {
        setClassTypeToEdit(classType);
        editModal.openModal();
    };

    const openDeleteModal = (id: number, name: string) => {
        setClassTypeToDelete(id);
        setClassTypeNameToDelete(name);
        deleteModal.openModal();
    };

    // Initial data fetching
    useEffect(() => {
        fetchClassTypes();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Class" />
                <div className="navbar bg-forth h-[76px] flex items-center">
                    <h1 className="text-3xl text-secondary ml-4 md:ml-14 mt-2">Class Type</h1>
                    <div className="ml-auto mr-4 md:mr-14 mt-2">
                        <button
                            className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 shadow-md hover:shadow-lg"
                            onClick={createModal.openModal}
                        >
                            <GrAddCircle className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                            <span>Create</span>
                        </button>
                    </div>
                </div>
                <div className="text-white bg-black overflow-auto h-[520px] scrollable-div flex justify-center">
                    <div className="max-w-full w-full md:w-[700px] h-[490px] bg-gray4 rounded-xl mt-6 p-4">
                        <ClassTypeTable classTypes={classtypes} onEdit={openEditModal} onDelete={openDeleteModal} />
                        <Toaster />
                    </div>
                </div>

                {/* Modals */}
                <Modal
                    isOpen={createModal.isOpen}
                    onClose={createModal.closeModal}
                    title="Create Class Type"
                    fetchClassTypes={fetchClassTypes}
                />
                <Modal
                    isOpen={editModal.isOpen}
                    onClose={editModal.closeModal}
                    title="Edit Class Type"
                    type="edit"
                    classType={classTypeToEdit}
                    fetchClassTypes={fetchClassTypes}
                />
                <Modal
                    isOpen={deleteModal.isOpen}
                    onClose={deleteModal.closeModal}
                    title="Confirm Delete"
                    type="delete"
                    classTypeName={classTypeNameToDelete}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default ClassType;
