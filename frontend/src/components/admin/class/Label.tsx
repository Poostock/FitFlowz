import React from "react";

interface LabelProps {
    text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => <label className="text-green1 mb-1 text-[20px]">{text}</label>;

export default Label;
