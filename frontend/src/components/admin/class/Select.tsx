import React from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    onChange: (value: string) => void;
    value: string;
    label: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value, label }) => {
    return (
        <div className="flex flex-col">
            <label className="text-green1 mb-1 text-[20px]">{label}</label>
            <select
                className="border rounded-xl w-[300px] h-[40px] mb-4 overflow-auto"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
