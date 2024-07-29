export const changeImage = async (token: string, formData: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error uploading file: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Категория изменена", data);
    } catch (error) {
        console.error("Error during file upload:", error);
    }
};

export const deleteImage = async (token: string, id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/upload/files/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка удаления файла: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Файл удален", data);
    } catch (error) {
        console.error("Ошибка:", error);
    }
};
