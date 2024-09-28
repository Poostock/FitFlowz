import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RiImageAddFill } from "react-icons/ri";

interface FileWithPreview extends File {
    preview: string;
}

interface DropzoneProps {
    trainerPicURL?: string; // Optional prop for image URL
    onDrop: (files: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ trainerPicURL, onDrop }) => {
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

    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div
            {...getRootProps()}
            style={{
                border: "2px dashed #000000",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <input {...getInputProps()} />
            {trainerPicURL || files.length > 0 ? (
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <img
                        src={trainerPicURL || files[0].preview}
                        alt="Preview"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            borderRadius: "50%",
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
                </div>
            )}
        </div>
    );
};

export default Dropzone;
