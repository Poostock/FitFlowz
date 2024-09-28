import React from "react";

interface InputProps {
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => (
    <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border rounded-xl w-full h-[40px] mb-4 px-2 text-base" // Using w-full for full width, added padding
    />
);

export default Input;
