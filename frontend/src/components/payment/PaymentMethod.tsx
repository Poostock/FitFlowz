import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PaymentMethodProps {
    selectedMethod: string;
    onMethodChange: (method: string) => void;
    setPromptPayImage: (image: string | null) => void; // Accept the setter as a prop
    promptPayImage: string | null; // Accept the uploaded image as a prop
    setExpiryDate: (date: Date | null) => void; // Accept setter for expiry date
    expiryDate: Date | null;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
    selectedMethod,
    onMethodChange,
    setPromptPayImage,
    promptPayImage,
    setExpiryDate,
    expiryDate,
}) => {
    // QR Code URL
    const promptPayQRCodeURL = "https://png.pngtree.com/png-clipart/20220729/original/pngtree-qr-code-png-image_8438558.png";

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPromptPayImage(reader.result as string); // Store as Base64 string using the passed setter
            };
            reader.readAsDataURL(file);
        } else {
            setPromptPayImage(null); // Clear image if no file is selected
        }
    };

    useEffect(() => {
        console.log(expiryDate);
    }, [expiryDate]);

    return (
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg flex-1 mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Select Payment Method</h2>

            <div className="flex justify-start mb-6 space-x-4">
                <button
                    className={`py-4 px-6 rounded-md shadow-md focus:outline-none ${
                        selectedMethod === "Credit Card" ? "bg-lime-400 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => onMethodChange("Credit Card")}
                >
                    Credit Card
                </button>
                <button
                    className={`py-4 px-6 rounded-md shadow-md focus:outline-none ${
                        selectedMethod === "PromptPay" ? "bg-lime-400 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => onMethodChange("PromptPay")}
                >
                    PromptPay
                </button>
            </div>

            {selectedMethod === "Credit Card" && (
                <>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="cardHolder">
                            Name on Card
                        </label>
                        <input
                            type="text"
                            id="cardHolder"
                            className="w-full p-2 rounded-2xl border border-gray-300 text-lg text-black"
                            placeholder="Enter card holder name"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="cardNumber">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            className="w-full p-2 rounded-2xl border border-gray-300 text-lg text-black"
                            placeholder="0000 - 0000 - 0000 - 0000"
                        />
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="w-1/2 mr-4">
                            <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="expiryDate">
                                Expiry Date
                            </label>
                            <DatePicker
                                selected={expiryDate} // Use the expiry date from props
                                onChange={(date: Date | null) => setExpiryDate(date)}
                                dateFormat="MM/yy"
                                placeholderText="Select Month/Year"
                                showPopperArrow={false}
                                className="w-full p-2 rounded-2xl border border-gray-300 text-lg text-black"
                                showMonthYearPicker
                            />
                        </div>
                        <div className="w-1/2 ml-4">
                            <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="cvvCode">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvvCode"
                                className="w-full p-2 rounded-2xl border border-gray-300 text-lg text-black"
                                placeholder="CVV"
                            />
                        </div>
                    </div>
                </>
            )}

            {selectedMethod === "PromptPay" && (
                <>
                    <div className="mb-6">
                        <h3 className="block text-gray-700 font-semibold mb-3 text-lg">PromptPay QR Code</h3>
                        <div className="w-full p-2 rounded-2xl border border-gray-300 flex justify-center items-center">
                            <img src={promptPayQRCodeURL} alt="PromptPay QR Code" className="w-32 h-auto" />
                        </div>
                    </div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="expiryDate">
                        Upload proof of payment.
                    </label>
                    <form>
                        <div className="flex items-center space-x-6">
                            <div className="shrink-0">
                                <img
                                    id="preview_img"
                                    className="h-16 w-16 object-cover rounded-full"
                                    src={promptPayImage || ""} // Use promptPayImage as source
                                    alt="Preview"
                                />
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose proof of payment</span>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-violet-700
                                        hover:file:bg-violet-100
                                    "
                                />
                            </label>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default PaymentMethod;
