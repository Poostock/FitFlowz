import React from "react";

interface TextareaProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, value, onChange }) => (
    <textarea
        className="textarea textarea-bordered h-24 w-[300px] border rounded-xl mb-4 p-2 overflow-auto scrollable-div"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

export default Textarea;
