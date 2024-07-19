"use client";

import React, { useState } from "react";

const Create = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDescription] = useState("");

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error("Please select a file first.");
            return;
        }
        const trys = {
            name: "four",
        };
        const formData = new FormData();

        for (let index = 0; index < selectedFile.length; index++) {
            formData.append("files.media", selectedFile[index]);
        }

        formData.append("data", JSON.stringify(trys));

        try {
            const response = await fetch("http://localhost:1337/api/cats", {
                // URL вашего Strapi сервера
                method: "POST",
                headers: {
                    Authorization: `Bearer 0cc84c66a60fa6d54e473a5ec3d99d1e366e4c91e17c63e762accb93382081b9e0599ed72663d443079e0b7dfb1803fa690faefebf7a6b91abb0b0a6dff05fd9c78f1d90458e6e1d8bffa2b6dc65ed9626ec725db3bb82d12ba9852db5c1e3537124941380b10b6afaac5085695560a8132a3b3a836f0c5fca4f7994a9c506bf`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error uploading file: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("File uploaded successfully:", data);
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    };
    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" multiple onChange={handleFileChange} />

            <button onClick={handleUpload}>Upload File</button>
        </div>
    );
};

export default Create;
