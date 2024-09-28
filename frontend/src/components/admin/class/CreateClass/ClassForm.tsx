// components/ClassForm.tsx
import React from 'react';
import Label from '../Label';
import Input from '../Input';
import Select from '../Select';
import Textarea from '../Textarea';
import DateTimePicker from '../DateTimePicker';
import { TrainersInterface } from '../../../../interfaces/ITrainer';
import { ClassTypesInterface } from '../../../../interfaces/IClassType';

interface ClassFormProps {
    className: string;
    setClassName: React.Dispatch<React.SetStateAction<string>>;
    selectedType: number | undefined;
    setSelectedType: React.Dispatch<React.SetStateAction<number | undefined>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    selectedTrainer: number | undefined;
    setSelectedTrainer: React.Dispatch<React.SetStateAction<number | undefined>>;
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    particNum: number | undefined;
    setParticNum: React.Dispatch<React.SetStateAction<number | undefined>>;
    trainers: TrainersInterface[];
    classTypes: ClassTypesInterface[];
}

const ClassForm: React.FC<ClassFormProps> = ({
    className,
    setClassName,
    selectedType,
    setSelectedType,
    description,
    setDescription,
    selectedTrainer,
    setSelectedTrainer,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    particNum,
    setParticNum,
    trainers,
    classTypes
}) => (
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
        <Textarea
            placeholder="Write description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
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
        <DateTimePicker
            selectedDate={endDate || new Date()}
            onChange={(date) => setEndDate(date)}
            label="End Date and Time:"
        />
        <Label text="No. of Attendees" />
        <Input
            placeholder="Enter Number of Attendees here"
            value={particNum?.toString() || ""}
            onChange={(e) => setParticNum(Number(e.target.value) || undefined)}
        />
    </div>
);

export default ClassForm;