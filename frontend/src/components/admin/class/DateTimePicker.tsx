import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
    selectedDate: Date;
    onChange: (date: Date | null) => void;
    label: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ selectedDate, onChange, label }) => (
    <div>
        <label className="block text-green1 mb-1 text-[20px]">{label}</label>
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            dateFormat="MMMM d, yyyy H:mm"
            className="p-2 border rounded-xl h-[40px] mb-4 w-[300px]"
        />
    </div>
);

export default DateTimePicker;
