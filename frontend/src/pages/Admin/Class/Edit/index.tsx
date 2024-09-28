import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../../components/admin/class/Navbar";
import SideBar from "../../../../components/admin/class/SideBar";
import Dropzone from "../../../../components/admin/class/Dropzone";
import Form from "../../../../components/admin/class/EditClass/Form";
import Modal from "../../../../components/admin/class/EditClass/Modal";
import { FaRegSave } from "react-icons/fa";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";
import { ClassesInterface } from "../../../../interfaces/IClass";
import toast, { Toaster } from "react-hot-toast";
import imageCompression from "browser-image-compression";
import { GetClassById, UpdateClass } from "../../../../service/https/class";
import { GetClassTypes } from "../../../../service/https/class/classType";
import { GetTrainers } from "../../../../service/https/class/trainer";

const EditClass: React.FC = () => {
    const { classID } = useParams<{ classID: string }>();
    const navigate = useNavigate();
    const [className, setClassName] = useState<string>("");
    const [trainers, setTrainers] = useState<TrainersInterface[]>([]);
    const [selectedTrainer, setSelectedTrainer] = useState<number | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<number | undefined>(undefined);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>("");
    const [classPic, setClassPic] = useState<File | null>(null);
    const [classPicURL, setClassPicURL] = useState<string>("");
    const [particNum, setParticNum] = useState<number | undefined>(undefined);
    const [classTypes, setClassTypes] = useState<ClassTypesInterface[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const fetchClassTypes = useCallback(async () => {
        try {
            const res = await GetClassTypes();
            if (res) setClassTypes(res);
        } catch (error) {
            console.error("Failed to fetch ClassTypes", error);
        }
    }, []);

    const fetchTrainers = useCallback(async () => {
        try {
            const res = await GetTrainers();
            if (res) setTrainers(res);
        } catch (error) {
            console.error("Failed to fetch Trainers", error);
        }
    }, []);

    const fetchClassDetails = useCallback(async () => {
        try {
            if (!classID) return;
            const res = await GetClassById(Number(classID));
            if (res) {
                setClassName(res.ClassName || "");
                setSelectedTrainer(res.TrainerID);
                setSelectedType(res.ClassTypeID);
                setStartDate(res.StartDate ? new Date(res.StartDate) : null);
                setEndDate(res.EndDate ? new Date(res.EndDate) : null);
                setDescription(res.Deets || "");
                setClassPicURL(res.ClassPic || "");
                setParticNum(res.ParticNum || undefined);
            }
        } catch (error) {
            console.error("Failed to fetch class details", error);
        }
    }, [classID]);

    const handleSave = async () => {
        setConfirmLoading(true);

        const delayedUpdateClass = new Promise<boolean>((resolve, reject) => {
            const updateClassAsync = async () => {
                try {
                    const adminID = localStorage.getItem("id");
                    const adminIDNumber = adminID ? Number(adminID) : 1;
                    const updatedClass: ClassesInterface = {
                        ID: Number(classID),
                        ClassName: className,
                        Deets: description,
                        TrainerID: selectedTrainer,
                        ClassPic: classPic ? await getBase64(classPic) : classPicURL,
                        ParticNum: particNum,
                        StartDate: startDate ? new Date(startDate) : undefined,
                        EndDate: endDate ? new Date(endDate) : undefined,
                        ClassTypeID: selectedType,
                        AdminID: adminIDNumber,
                    };

                    const res = await UpdateClass(updatedClass);
                    if (res) {
                        resolve(true);
                    } else {
                        reject(new Error("Failed to update class."));
                    }
                } catch (error) {
                    reject(error);
                }
            };

            updateClassAsync();
        });

        toast.promise(delayedUpdateClass, {
            loading: "Updating class...",
            success: "Class updated successfully!",
            error: "Failed to update class.",
        });

        try {
            await delayedUpdateClass;
            navigate("/class");
        } catch (error) {
            console.error("Error updating class:", error);
        } finally {
            setConfirmLoading(false);
            setModalVisible(false);
        }
    };

    const showConfirmModal = () => setModalVisible(true);
    const handleCancel = () => setModalVisible(false);

    const handleDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const options = {
                maxSizeMB: 0.9,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                setClassPic(compressedFile);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setClassPicURL(reader.result as string);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error compressing file:", error);
            }
        }
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        fetchClassTypes();
        fetchTrainers();
        fetchClassDetails();
    }, [fetchClassTypes, fetchTrainers, fetchClassDetails]);

    useEffect(() => {
        if (trainers.length > 0 && selectedTrainer === undefined) {
            setSelectedTrainer(trainers[0].ID);
        }
    }, [trainers, selectedTrainer]);

    useEffect(() => {
        if (classTypes.length > 0 && selectedType === undefined) {
            setSelectedType(classTypes[0].ID);
        }
    }, [classTypes, selectedType]);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Class" />
                <div className="navbar bg-black h-[76px] flex items-center">
                    <h1 className="text-3xl text-secondary ml-14 mt-5">EDIT CLASS</h1>
                    <button
                        className={`text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-hover ml-auto mr-14 shadow-md hover:shadow-lg ${
                            confirmLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={showConfirmModal}
                        disabled={confirmLoading}
                    >
                        <FaRegSave className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                        <span>Save</span>
                    </button>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="bg-gray4 mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex  ">
                            <div className="pt-10"><Dropzone onDrop={handleDrop} classPicURL={classPicURL} /></div>
                            
                            <Form
                                className={className}
                                setClassName={setClassName}
                                trainers={trainers}
                                selectedTrainer={selectedTrainer}
                                setSelectedTrainer={setSelectedTrainer}
                                classTypes={classTypes}
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                description={description}
                                setDescription={setDescription}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                particNum={particNum}
                                setParticNum={setParticNum}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Confirm Save" visible={modalVisible} onOk={handleSave} onCancel={handleCancel} confirmLoading={confirmLoading}>
                <p>Are you sure you want to Update this class?</p>
            </Modal>
            <Toaster />
        </div>
    );
};

export default EditClass;
