import React from "react";

interface ModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    title: string;
    children: React.ReactNode;
    confirmLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({ visible, onOk, onCancel, title, children, confirmLoading = false }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="mb-4">{children}</div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                        onClick={onCancel}
                        disabled={confirmLoading}
                    >
                        Cancel
                    </button>
                    <button
                        className={`px-4 py-2 bg-green3 text-white rounded hover:bg-green5 ${
                            confirmLoading ? "bg-green3 cursor-not-allowed" : "bg-green5"
                        }`}
                        onClick={onOk}
                        disabled={confirmLoading}
                    >
                        {confirmLoading ? "Saving..." : "OK"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
