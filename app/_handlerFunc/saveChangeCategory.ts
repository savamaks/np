export const saveChangeCategory = async ({ data, id }: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/categories/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
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
