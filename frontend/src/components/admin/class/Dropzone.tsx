import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RiImageAddFill } from "react-icons/ri";
// import { MdEdit } from "react-icons/md";

interface FileWithPreview extends File {
    preview: string;
}

interface DropzoneProps {
    classPicURL?: string; // Optional prop for image URL
    onDrop: (files: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ classPicURL, onDrop }) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const mappedFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setFiles(mappedFiles);
            onDrop(acceptedFiles);
        },
    });

    // Clean up memory when component unmounts
    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div
            {...getRootProps()}
            style={{
                border: "2px dashed #000000",
                borderRadius: "25px",
                width: "400px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <input {...getInputProps()} />
            {classPicURL || files.length > 0 ? (
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <img
                        src={classPicURL || files[0].preview}
                        alt="Preview"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    />
                    
                </div>
            ) : (
                <div
                    style={{
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <RiImageAddFill style={{ fontSize: "32px", marginBottom: "8px" }} />
                    <p style={{ fontSize: "13px", textAlign: "center" }}>
                        Drag and drop <span style={{ color: "#8BC804" }}>or browse</span> to upload
                    </p>
                    <p style={{ fontSize: "11px", textAlign: "center" }}>PNG, JPG </p>
                </div>
            )}
        </div>
    );
};

export default Dropzone;
