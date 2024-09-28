import React from "react";
import Label from "../Label";
import Input from "../Input";
import Select from "../Select";
import Textarea from "../Textarea";
import DateTimePicker from "../DateTimePicker";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";

interface FormProps {
    className: string;
    setClassName: (value: string) => void;
    trainers: TrainersInterface[];
    selectedTrainer: number | undefined;
    setSelectedTrainer: (value: number | undefined) => void;
    classTypes: ClassTypesInterface[];
    selectedType: number | undefined;
    setSelectedType: (value: number | undefined) => void;
    description: string;
    setDescription: (value: string) => void;
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
    endDate: Date | null;
    setEndDate: (date: Date | null) => void;
    particNum: number | undefined;
    setParticNum: (value: number | undefined) => void;
}

const Form: React.FC<FormProps> = ({
    className,
    setClassName,
    trainers,
    selectedTrainer,
    setSelectedTrainer,
    classTypes,
    selectedType,
    setSelectedType,
    description,
    setDescription,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    particNum,
    setParticNum,
}) => {
    return (
        <div className="flex-1 pt-7">
            <div className="flex flex-col items-start ml-[40px]">
                <Label text="Name" />
                <Input placeholder="Enter Name here" value={className} onChange={(e) => setClassName(e.target.value)} />
                <Select
                    options={classTypes.map((type) => ({
                        value: type.ID?.toString() || "",
                        label: type.Name || "Unnamed",
                    }))}
                    value={selectedType?.toString() || ""}
                    onChange={(value) => setSelectedType(value ? Number(value) : undefined)}
                    label="Type"
                />
                <Label text="Description" />
                <Textarea placeholder="Write description here" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Select
                    options={trainers.map((trainer) => ({
                        value: trainer.ID?.toString() || "",
                        label: trainer.Name || "Unnamed",
                    }))}
                    value={selectedTrainer?.toString() || ""}
                    onChange={(value) => setSelectedTrainer(value ? Number(value) : undefined)}
                    label="Trainer"
                />
                <DateTimePicker
                    selectedDate={startDate || new Date()}
                    onChange={(date) => setStartDate(date)}
                    label="Start Date and Time:"
                />
                <DateTimePicker selectedDate={endDate || new Date()} onChange={(date) => setEndDate(date)} label="End Date and Time:" />
                <Label text="No. of Attendees" />
                <Input
                    placeholder="Enter Number of Attendees here"
                    value={particNum?.toString() || ""}
                    onChange={(e) => setParticNum(Number(e.target.value) || undefined)}
                />
            </div>
        </div>
    );
};

export default Form;
